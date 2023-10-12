const fs = require("node:fs");

const promisify =
  (asyncFn) =>
  (...args) => {
    return new Promise((resolve, reject) => {
      asyncFn(...args, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  };

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

readdir(".")
  .then((files) => {
    console.log("files: ", files);
    return readFile(files[0], { encoding: "utf-8" });
  })
  .then((content) => {
    console.log("content: ", content);
  })
  .catch((err) => {
    console.log("err: ", err);
  });
