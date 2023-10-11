const assert = require("assert");
const axios = require("axios");
const { a1 } = require("./data/articles");

describe("Articles", function () {
  it("should get all articles", async () => {
    let response = await axios.get("http://localhost:3000/api/articles");

    const ids = response.data.map((a) => a.id);
    response = await axios.delete("http://localhost:3000/api/articles", {
      data: ids,
    });

    response = await axios.get("http://localhost:3000/api/articles");

    assert.deepStrictEqual(response.data, []);
  });

  it("should add one article", async () => {
    let response = await axios.post("http://localhost:3000/api/articles", a1);

    assert.deepStrictEqual(response.status, 201);
    const keys = Object.keys(response.data);
    assert.deepStrictEqual(keys, ["id"]);
    response = await axios.get("http://localhost:3000/api/articles");

    assert.deepStrictEqual(response.data.length, 1);
  });

  it("get one article", async () => {
    let response = await axios.get("http://localhost:3000/api/articles");
    const id = response.data[0].id;
    response = await axios.get(`http://localhost:3000/api/articles/${id}`);

    assert.deepStrictEqual(response.status, 200);
    const expectedA1 = { ...response.data };
    delete expectedA1.id;
    assert.deepStrictEqual(expectedA1, a1);
  });
});
