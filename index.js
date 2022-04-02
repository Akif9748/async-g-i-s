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
 * @returns {Promise<[Result]>} Array of results
 */
async function gis(searchTerm, queryStringAddition = "", filterOutDomains = ['gstatic.com']) {

  if (!searchTerm) throw new TypeError("searchTerm is missing.");

  try {

    const url = `${baseURL}?tbm=isch&q=${searchTerm}${queryStringAddition}`

    const body = await fetch(url, {
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

      while ((result = regex.exec(content)) !== null) {

        if (result.length > 3) {

          const ref = new Result(result[1], +result[2], +result[3]);

          if (filterOutDomains.every(skipDomain => ref.url.indexOf(skipDomain) === -1))
            results.push(ref);

        }
      }
      return results;

    }));
  } catch (e) {
    return e;
  }

}


/**
 * Image search result class
 */
class Result {
  /**
   * Image search result
   * @param {String} url Image URL
   * @param {Number} height 
   * @param {Number} width 
   */
  constructor(url, height, width) {
    /**
     * Image URL
     */
    this.url = url;

    /**
     * Image height
     */
    this.height = height;

    /**
     * Image width
     */
    this.width = width;
  }
}


module.exports = gis;