import express from "express";
import morgan from "morgan";
import serveIndex from "serve-index";

import api from "./api";

console.log("About to start a server...");

const app = express();
const port = +(process.env.GESTION_STOCK_PORT || 3000);
const publicDir = "../front/dist";
const apiType = process.env.GESTION_STOCK_APITYPE || "ram";

app.use(morgan("dev"));

app.use(express.json());

app.use("/api", api(apiType));

app.use(express.static(publicDir));
app.use(serveIndex(publicDir, { icons: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}, with type=${apiType}`);
});
