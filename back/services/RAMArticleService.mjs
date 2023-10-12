import { isMatchingName } from "../misc.mjs";
import { randomUUID } from "node:crypto";

export class RAMArticleService {
  articles = [];

  constructor() {}

  async retrieveAll(query) {
    const filteredArticles = this.articles.filter((a) => {
      if (query.name !== undefined) {
        return isMatchingName(a.name, query.name);
      }
      return true;
    });
    return filteredArticles;
  }

  async retrieveOne(id) {
    return this.articles.find((a) => a.id === id);
  }

  async add(newArticle) {
    const article = { ...newArticle, id: randomUUID() };
    console.log("article: ", article);
    this.articles.push(article);
    return article.id;
  }

  async deleteOne(id) {
    const index = this.articles.findIndex((a) => a.id === id);
    if (index === -1) {
      return;
    }
    // article trouve
    this.articles.splice(index, 1);
  }

  async deleteMany(ids) {
    this.articles = this.articles.filter((a) => !ids.includes(a.id));
  }
}
