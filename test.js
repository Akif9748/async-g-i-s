const gis = require('.');
const test = require('node:test');
const assert = require("node:assert");

test("common test", async () => {
  const results = await gis("akif9748");
  console.log(results);
  assert(results.length > 0);
  assert(results[0].url.length > 0);
  assert(results[0].height > 0);
  assert(results[0].width > 0);
});