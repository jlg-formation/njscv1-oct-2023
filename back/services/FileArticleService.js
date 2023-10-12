const { isMatchingName } = require("../misc");
const { randomUUID } = require("node:crypto");

class FileArticleService {
  articles = [];

  constructor() {}

  retrieveAll(query) {
    const filteredArticles = this.articles.filter((a) => {
      if (query.name !== undefined) {
        return isMatchingName(a.name, query.name);
      }
      return true;
    });
    return filteredArticles;
  }

  retrieveOne(id) {
    return this.articles.find((a) => a.id === id);
  }

  add(newArticle) {
    const article = { ...newArticle, id: randomUUID() };
    console.log("article: ", article);
    this.articles.push(article);
    return article.id;
  }

  deleteOne(id) {
    const index = this.articles.findIndex((a) => a.id === id);
    if (index === -1) {
      return;
    }
    // article trouve
    this.articles.splice(index, 1);
  }

  deleteMany(ids) {
    this.articles = this.articles.filter((a) => !ids.includes(a.id));
  }
}

module.exports = { FileArticleService };
