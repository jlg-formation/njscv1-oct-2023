const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("gestion-stock");
    const movies = database.collection("articles");
    // Query for a movie that has the title 'Back to the Future'
    const query = { name: "Pelle" };
    const article = await movies.findOne(query);
    console.log(article);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
