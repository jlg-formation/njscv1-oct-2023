console.log("About to start a server...");
const express = require("express");
const serveIndex = require("serve-index");
const { randomUUID } = require("node:crypto");

const app = express();
const port = 3000;
const publicDir = ".";

const articles = [];

app.use((req, res, next) => {
  console.log("req: ", req.method, req.url);
  next();
});

app.use(express.json());

app.get("/api/articles", (req, res) => {
  res.json(articles);
});

app.post("/api/articles", (req, res) => {
  // retrouver le body
  // le contenu du body est l'article a ajouter
  // creer un id unique
  // on push l'article dans le tableau
  // on envoie une reponse 201 (created)
  // avec un body contenant l'id cree. au format json

  const article = { ...req.body, id: randomUUID() };
  console.log("article: ", article);
  articles.push(article);
  res.status(201).json({ id: article.id });
});

app.use(express.static(publicDir));
app.use(serveIndex(publicDir, { icons: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
