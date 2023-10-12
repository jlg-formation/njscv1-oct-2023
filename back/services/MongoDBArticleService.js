const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const database = client.db("gestion-stock");
const articles = database.collection("articles");

class MongoDBArticleService {
  constructor() {}

  async retrieveAll(query) {
    const documents = await articles.find().toArray();
    console.log("documents: ", documents);
    return documents;
  }

  retrieveOne(id) {
    return undefined;
  }

  add(newArticle) {
    throw new Error("Method not implemented");
  }

  deleteOne(id) {
    throw new Error("Method not implemented");
  }

  deleteMany(ids) {
    throw new Error("Method not implemented");
  }
}

module.exports = { MongoDBArticleService };
