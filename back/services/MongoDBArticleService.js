import { MongoClient, ObjectId } from "mongodb";
import { handleId } from "../misc";

// Replace the uri string with your connection string.
const uri = process.env.GESTION_STOCK_MONGODB || "mongodb://127.0.0.1:27017";
const databaseName = process.env.GESTION_STOCK_MONGODB_DB || "gestion-stock";
const client = new MongoClient(uri);
const database = client.db(databaseName);
const articles = database.collection("articles");

export class MongoDBArticleService {
  /**
   * Retrieve all articles from MongoDB.
   * Warning: this method does not implement filter
   *
   * @param {*} query
   * @return a list of articles
   * @memberof MongoDBArticleService
   */
  async retrieveAll() {
    try {
      const documents = await articles.find().toArray();
      return documents.map((doc) => handleId(doc));
    } catch (err) {
      console.log("err: ", err);
      throw err;
    }
  }

  async retrieveOne(id) {
    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (err) {
      return undefined;
    }
    const doc = await articles.findOne({ _id: objectId });
    if (doc === null) {
      return undefined;
    }
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
