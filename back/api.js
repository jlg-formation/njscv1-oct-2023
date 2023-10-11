const express = require("express");
const { randomUUID } = require("node:crypto");

const app = express.Router();

const articles = [];

app.get("/articles", (req, res) => {
  res.json(articles);
});

app.post("/articles", (req, res) => {
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

module.exports = app;
