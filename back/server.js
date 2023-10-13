console.log("About to start a server...");
import express from "express";
import serveIndex from "serve-index";
import morgan from "morgan";

import api from "./api";

const app = express();
const port = 3000;
const publicDir = ".";

app.use(morgan("dev"));

app.use(express.json());

app.use("/api", api("mongodb"));

app.use(express.static(publicDir));
app.use(serveIndex(publicDir, { icons: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
