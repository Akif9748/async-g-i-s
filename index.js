const cheerio = require('cheerio');
const fetch = global.fetch || require('node-fetch');

const imageFileExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];


/**
 * 
 * Async version of g-i-s module
 * @async
 * @param {String} searchTerm Search term for search
 * @param {Object} query You can use custom query
 * @param {[String]} filterOutDomains Not looking for these domains
 * @param {Boolean} disableDoubleHTTP Disable double http in url, slow, and safe
 * @returns {Promise<[Object]>} Array of results
 */
module.exports = async function gis(searchTerm, query = {}, filterOutDomains = ['gstatic.com'], disableDoubleHTTP = true) {

  if (!searchTerm) throw new TypeError("searchTerm is missing.");
  try {

    const body = await fetch(`http://images.google.com/search?${new URLSearchParams({ ...query, tbm: "isch", q: searchTerm })}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
      }
    }).then(res => res.text());

    const scripts = cheerio.load(body)('script');
    const scriptContents = [];

    for (const script of scripts)
      if (script.children?.length) {

        const content = script.children[0].data;

        if (imageFileExtensions.some(a => content.toLowerCase().includes(a)))
          scriptContents.push(content);


      }

    return scriptContents.map(content => {

      const results = [];
      const regex = /\["(http.+?)",(\d+),(\d+)\]/g;

      let result;

      while ((result = regex.exec(content)) !== null)
        if (result.length > 3 && filterOutDomains.every(skipDomain => !result[1].includes(skipDomain)))
          results.push({
            url: disableDoubleHTTP ? `http${result[1].split("http")[1]}` : result[1],
            height: +result[2],
            width: +result[3]
          });

      return results;

    }).flat();
  } catch (e) {
    console.error(e);
    return null;
  }

}

