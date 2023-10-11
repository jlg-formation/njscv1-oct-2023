const express = require("express");
const { randomUUID } = require("node:crypto");

const app = express.Router();

let articles = [];

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

app.delete("/articles/:id", (req, res) => {
  // retrouve l'article dans le tableau articles avec son id
  // deux cas : on a retrouve l'article ou pas
  // pas trouve -> on genere une reponse 404 not found
  // trouve -> on supprime l'article du tableau avec son id
  // et on renvoie une reponse 204 no content sans body

  const id = req.params.id;
  console.log("id: ", id);

  const index = articles.findIndex((a) => a.id === id);
  if (index === -1) {
    // article pas trouve
    res.status(404).end();
    return;
  }
  // article trouve
  articles.splice(index, 1);
  res.status(204).end();
});

module.exports = app;
