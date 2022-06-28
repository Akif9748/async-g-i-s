const cheerio = require('cheerio');
const flatten = require('lodash.flatten');
const fetch = require("node-fetch");

const baseURL = 'http://images.google.com/search';
const imageFileExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];


/**
 * 
 * Async version of g-i-s module
 * @async
 * @param {String} searchTerm Search term for search
 * @param {String} queryStringAddition You can add custom query
 * @param {[String]} filterOutDomains Not looking for these domains
 * @returns {Promise<[Object]>} Array of results
 */
async function gis(searchTerm, queryStringAddition = "", filterOutDomains = ['gstatic.com']) {

  if (!searchTerm) throw new TypeError("searchTerm is missing.");

  try {

    const body = await fetch(`${baseURL}?tbm=isch&q=${searchTerm}${queryStringAddition}`, {
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

    return flatten(scriptContents.map(content => {

      const results = [];

      const regex = /\["(http.+?)",(\d+),(\d+)\]/g;

      let result;

      while ((result = regex.exec(content)) !== null) 

        if (result.length > 3) {

          const ref = {
            url: result[1],
            height: +result[2],
            width: +result[3]
          }

          if (filterOutDomains.every(skipDomain => !ref.url.includes(skipDomain)))
            results.push(ref);

        }
      
      return results;

    }));
  } catch (e) {
    return e;
  }

}

module.exports = gis;