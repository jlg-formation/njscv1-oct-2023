import _ from "lodash";
import { randomUUID } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { isMatchingName } from "../misc";

const FILENAME = "./data/articles.json";

export class FileArticleService {
  #articles = [];

  constructor() {
    try {
      this.#articles = JSON.parse(
        readFileSync(FILENAME, { encoding: "utf-8" })
      );
    } catch (err) {
      mkdirSync(dirname(FILENAME), { recursive: true });
      writeFileSync(FILENAME, JSON.stringify(this.#articles));
      console.warn("articles.json recreated");
    }
  }

  debounceSave = _.debounce(this.save.bind(this), 2000);

  save() {
    writeFileSync(FILENAME, JSON.stringify(this.#articles, undefined, 2));
  }

  async retrieveAll(query) {
    const filteredArticles = this.#articles.filter((a) => {
      if (query.name !== undefined) {
        return isMatchingName(a.name, query.name);
      }
      return true;
    });
    return filteredArticles;
  }

  async retrieveOne(id) {
    return this.#articles.find((a) => a.id === id);
  }

  async add(newArticle) {
    const article = { ...newArticle, id: randomUUID() };
    console.log("article: ", article);
    this.#articles.push(article);
    this.debounceSave();
    return article.id;
  }

  async deleteOne(id) {
    const index = this.#articles.findIndex((a) => a.id === id);
    if (index === -1) {
      return;
    }
    // article trouve
    this.#articles.splice(index, 1);
    this.debounceSave();
  }

  async deleteMany(ids) {
    this.#articles = this.#articles.filter((a) => !ids.includes(a.id));
    this.debounceSave();
  }
}
