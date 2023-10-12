const express = require("express");
const { RAMArticleService } = require("./services/RAMArticleService");

const app = express.Router();

const articleService = new RAMArticleService();
// const articleService = new FileArticleService();
// const articleService = new MongoDBArticleService();
// const articleService = new MySQLArticleService();

app.get("/articles", (req, res) => {
  const query = req.query;
  console.log("query: ", query);
  const filteredArticles = articleService.retrieveAll(query);
  res.json(filteredArticles);
});

app.get("/articles/:id", (req, res) => {
  // on retrouve l'id
  // on cherche l'article dans la liste des articles
  // -> pas trouve on fait une reponse 404 not found sans body
  // -> trouve on renvoie une reponse 200 ok avec body = article

  const id = req.params.id;
  const article = articleService.retrieveOne(id);
  if (article === undefined) {
    res.status(404).end("404 not found");
    return;
  }
  res.json(article);
});

app.post("/articles", (req, res) => {
  // retrouver le body
  // le contenu du body est l'article a ajouter
  // creer un id unique
  // on push l'article dans le tableau
  // on envoie une reponse 201 (created)
  // avec un body contenant l'id cree. au format json

  const id = articleService.add(req.body);
  res.status(201).json({ id });
});

app.delete("/articles/:id", (req, res) => {
  // retrouve l'article dans le tableau articles avec son id
  // deux cas : on a retrouve l'article ou pas
  // pas trouve -> on genere une reponse 404 not found
  // trouve -> on supprime l'article du tableau avec son id
  // et on renvoie une reponse 204 no content sans body

  const id = req.params.id;
  console.log("id: ", id);

  const article = articleService.retrieveOne(id);
  if (article === undefined) {
    // article pas trouve
    res.status(404).end("404 not found");
    return;
  }
  // article trouve
  articleService.deleteOne(id);
  res.status(204).end();
});

app.delete("/articles", (req, res) => {
  // retrouver la liste des ids (body)
  // retrouve les articles dans le tableau articles avec leur id
  // nettoyer le tableau d'article en enlevant tous
  // les articles dont l'id est dans la liste des ids
  // et on renvoie une reponse 204 no content sans body

  const ids = req.body;
  console.log("ids: ", ids);
  articleService.deleteMany(ids);
  res.status(204).end();
});

module.exports = app;
