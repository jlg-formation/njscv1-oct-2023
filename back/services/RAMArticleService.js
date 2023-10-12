const { isMatchingName } = require("../misc");
const { randomUUID } = require("node:crypto");

class RAMArticleService {
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
}

module.exports = { RAMArticleService };
