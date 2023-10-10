console.log("About to start a server...");

const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  const path = req.url;
  console.log("path: ", path);
  if (path === "/favicon.ico") {
    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
    });
    const content = fs.readFileSync("./logo.svg", { encoding: "utf-8" });
    res.end(content);
    return;
  }
  res.writeHead(200, { "Content-Type": "text/plain", "X-Hello-World": "yyy" });
  res.end("okay");
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});
