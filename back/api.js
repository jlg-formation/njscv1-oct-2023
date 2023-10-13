import { Router } from "express";
import { RAMArticleService } from "./services/RAMArticleService";
import { FileArticleService } from "./services/FileArticleService";
import { MongoDBArticleService } from "./services/MongoDBArticleService";

const api = (type) => {
  const app = Router();

  let articleService;
  switch (type) {
    case "ram":
      articleService = new RAMArticleService();
      break;
    case "file":
      articleService = new FileArticleService();
      break;
    case "mongodb":
      articleService = new MongoDBArticleService();
      break;
    default:
      throw new Error(`Cannot start api middleware. Bad type: ${type}`);
  }

  app.get("/articles", (req, res) => {
    (async () => {
      try {
        const query = req.query;
        const filteredArticles = await articleService.retrieveAll(query);
        res.json(filteredArticles);
      } catch (err) {
        console.log("err: ", err);
        res.status(500).end();
      }
    })();
  });

  app.get("/articles/:id", (req, res) => {
    // on retrouve l'id
    // on cherche l'article dans la liste des articles
    // -> pas trouve on fait une reponse 404 not found sans body
    // -> trouve on renvoie une reponse 200 ok avec body = article

    (async () => {
      try {
        const id = req.params.id;
        const article = await articleService.retrieveOne(id);
        if (article === undefined) {
          res.status(404).end("404 not found");
          return;
        }
        res.json(article);
      } catch (err) {
        console.log("err: ", err);
        res.status(500).end();
      }
    })();
  });

  app.post("/articles", (req, res) => {
    (async () => {
      try {
        // retrouver le body
        // le contenu du body est l'article a ajouter
        // creer un id unique
        // on push l'article dans le tableau
        // on envoie une reponse 201 (created)
        // avec un body contenant l'id cree. au format json

        const id = await articleService.add(req.body);
        res.status(201).json({ id });
      } catch (err) {
        console.log("err: ", err);
        res.status(500).end();
      }
    })();
  });

  app.delete("/articles/:id", (req, res) => {
    (async () => {
      try {
        // retrouve l'article dans le tableau articles avec son id
        // deux cas : on a retrouve l'article ou pas
        // pas trouve -> on genere une reponse 404 not found
        // trouve -> on supprime l'article du tableau avec son id
        // et on renvoie une reponse 204 no content sans body

        const id = req.params.id;

        const article = articleService.retrieveOne(id);
        if (article === undefined) {
          // article pas trouve
          res.status(404).end("404 not found");
          return;
        }
        // article trouve
        await articleService.deleteOne(id);
        res.status(204).end();
      } catch (err) {
        console.log("err: ", err);
        res.status(500).end();
      }
    })();
  });

  app.delete("/articles", (req, res) => {
    (async () => {
      try {
        // retrouver la liste des ids (body)
        // retrouve les articles dans le tableau articles avec leur id
        // nettoyer le tableau d'article en enlevant tous
        // les articles dont l'id est dans la liste des ids
        // et on renvoie une reponse 204 no content sans body

        const ids = req.body;
        await articleService.deleteMany(ids);
        res.status(204).end();
      } catch (err) {
        console.log("err: ", err);
        res.status(500).end();
      }
    })();
  });

  return app;
};

export default api;
