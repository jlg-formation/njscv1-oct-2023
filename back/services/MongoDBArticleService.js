const { MongoClient, ObjectId } = require("mongodb");
const { handleId } = require("../misc");

// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const database = client.db("gestion-stock");
const articles = database.collection("articles");

class MongoDBArticleService {
  constructor() {}

  async retrieveAll(query) {
    try {
      const documents = await articles.find().toArray();

      return documents.map((doc) => handleId(doc));
    } catch (err) {}
  }

  async retrieveOne(id) {
    const doc = await articles.findOne({ _id: new ObjectId(id) });
    const article = handleId(doc);
    return article;
  }

  async add(newArticle) {
    const doc = await articles.insertOne(newArticle);
    return doc.insertedId.toString();
  }

  async deleteOne(id) {
    await articles.deleteOne({ _id: new ObjectId(id) });
  }

  async deleteMany(ids) {
    const docIds = ids.map((id) => new ObjectId(id));
    await articles.deleteMany({ _id: { $in: docIds } });
  }
}

module.exports = { MongoDBArticleService };
