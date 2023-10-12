const assert = require("assert");
const axios = require("axios");
const { a1 } = require("./data/articles");

const url = "http://localhost:3000/api/articles";

describe("Articles", function () {
  it("should get all articles", async () => {
    let response = await axios.get(url);

    const ids = response.data.map((a) => a.id);
    response = await axios.delete(url, {
      data: ids,
    });

    response = await axios.get(url);

    assert.deepStrictEqual(response.data, []);
  });

  it("should add one article", async () => {
    let response = await axios.post(url, a1);

    assert.deepStrictEqual(response.status, 201);
    const keys = Object.keys(response.data);
    assert.deepStrictEqual(keys, ["id"]);
    response = await axios.get(url);

    assert.deepStrictEqual(response.data.length, 1);
  });

  it("get one article", async () => {
    let response = await axios.get(url);
    const id = response.data[0].id;
    response = await axios.get(`${url}/${id}`);

    assert.deepStrictEqual(response.status, 200);
    const expectedA1 = { ...response.data };
    delete expectedA1.id;
    assert.deepStrictEqual(expectedA1, a1);
  });

  it("delete one article", async () => {
    let response = await axios.get(url);
    const id = response.data[0].id;
    const articleNbr = response.data.length;
    response = await axios.delete(`${url}/${id}`);
    assert.deepStrictEqual(response.status, 204);
    response = await axios.get(url);
    const newArticleNbr = response.data.length;
    assert.deepStrictEqual(newArticleNbr, articleNbr - 1);
  });
});
