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
    console.log("start retrieveAll");
    try {
      const documents = await articles.find().toArray();
      console.log("documents: ", documents);

      return documents.map((doc) => handleId(doc));
    } catch (err) {
      console.log("err: ", err);
    }
  }

  async retrieveOne(id) {
    return undefined;
  }

  async add(newArticle) {
    const doc = await articles.insertOne(newArticle);
    return doc.insertedId.toString();
  }

  async deleteOne(id) {
    throw new Error("Method not implemented");
  }

  async deleteMany(ids) {
    const docIds = ids.map((id) => new ObjectId(id));
    await articles.deleteMany({ _id: { $in: docIds } });
  }
}

module.exports = { MongoDBArticleService };
