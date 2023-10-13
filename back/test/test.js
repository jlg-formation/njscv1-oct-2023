import assert from "assert";
import axios from "axios";
import { a1 } from "./data/articles";

const port = +(process.env.GESTION_STOCK_PORT || 3000);
const url = `http://localhost:${port}/api/articles`;

describe("Articles", () => {
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
    const { id } = response.data[0];
    response = await axios.get(`${url}/${id}`);

    assert.deepStrictEqual(response.status, 200);
    const expectedA1 = { ...response.data };
    delete expectedA1.id;
    assert.deepStrictEqual(expectedA1, a1);
  });

  it("delete one article", async () => {
    let response = await axios.get(url);
    const { id } = response.data[0];
    const articleNbr = response.data.length;
    response = await axios.delete(`${url}/${id}`);
    assert.deepStrictEqual(response.status, 204);
    response = await axios.get(url);
    const newArticleNbr = response.data.length;
    assert.deepStrictEqual(newArticleNbr, articleNbr - 1);
  });

  it("should delete many articles", async () => {
    await axios.post(url, a1);
    await axios.post(url, a1);
    await axios.post(url, a1);
    let response = await axios.get(url);
    const ids = response.data.map((a) => a.id);
    const toRemoveIds = ids.slice(0, 2);
    await axios.delete(url, { data: toRemoveIds });
    response = await axios.get(url);
    const remainingIds = response.data.map((a) => a.id);
    assert.deepStrictEqual(remainingIds, [ids[2]]);
  });

  it("should return 404 (bad id)", async () => {
    const response = await axios.get(`${url}/qqq`, { validateStatus: false });
    assert.deepStrictEqual(response.status, 404);
  });

  it("should return 404 (well formatted id)", async () => {
    const response = await axios.get(`${url}/000000000000000000000001`, {
      validateStatus: false,
    });
    assert.deepStrictEqual(response.status, 404);
  });
});
