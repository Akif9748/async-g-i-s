const gis = require('..');

(async () => {
  try {

    const results = await gis("akif");
    console.log(results.slice(0, 10));

  } catch (e) {
    console.error(e);
  }
})();