const gis = require('.');

(async () => {
  try {
    
    console.time();
    const results = await gis("akif");
    console.log(results.slice(0, 100));
    console.timeEnd();

  } catch (e) {
    console.error(e);
  }
})();