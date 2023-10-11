console.log("About to start a server...");
const express = require("express");
const serveIndex = require("serve-index");

const app = express();
const port = 3000;
const publicDir = ".";

const generateId = () => {
  return Date.now() + "_" + (Math.random() * 1e9).toFixed(0);
};

const articles = [];

app.use((req, res, next) => {
  console.log("req: ", req.method, req.url);
  next();
});

app.use(express.json());

app.get("/api/articles", (req, res) => {
  res.json([{ name: "Tournevis", price: 2.99, qty: 120 }]);
});

app.post("/api/articles", (req, res) => {
  // retrouver le body
  // le contenu du body est l'article a ajouter
  // creer un id unique
  // on push l'article dans le tableau
  // on envoie une reponse 201 (created)
  // avec un body contenant l'id cree. au format json

  const body = req.body;
  const article = { ...body, id: generateId() };
  console.log("article: ", article);

  res.send("okay");
});

app.use(express.static(publicDir));
app.use(serveIndex(publicDir, { icons: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
