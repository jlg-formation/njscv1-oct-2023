const { isMatchingName } = require("../misc");

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
}

module.exports = { RAMArticleService };
