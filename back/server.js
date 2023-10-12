console.log("About to start a server...");
import express from "express";
import serveIndex from "serve-index";

import api from "./api.js";

const app = express();
const port = 3000;
const publicDir = ".";

app.use((req, res, next) => {
  console.log("req: ", req.method, req.url);
  next();
});

app.use(express.json());

app.use("/api", api("mongodb"));

app.use(express.static(publicDir));
app.use(serveIndex(publicDir, { icons: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
