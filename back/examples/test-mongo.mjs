import { MongoClient } from "mongodb";

// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

(async () => {
  try {
    const database = client.db("gestion-stock");
    const movies = database.collection("articles");
    // Query for a movie that has the title 'Back to the Future'
    const query = { name: "Pelle" };
    const article = await movies.findOne(query);
    console.log(article);
  } catch (err) {
    console.log("err: ", err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
})();
