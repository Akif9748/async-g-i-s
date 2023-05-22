const { parse } = require('node-html-parser');
const fetch = global.fetch || require('node-fetch');

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
const REGEX = /\["(http.+?)",(\d+),(\d+)\]/g;

/**
 * 
 * Async version of g-i-s module
 * @async
 * @param {String} searchTerm Search term for search
 * @param {Object} options Options for search
 * @param {Object} options.query You can use custom query
 * @param {[String]} options.filterOutDomains Not looking for these domains
 * @param {String} options.userAgent User agent for request
 * @param {Boolean} options.disableDoubleHTTP Disable double http in url, slow, and safe
 * @returns {Promise<[{url: string, height: number, width: number }]>} Array of results
 */

module.exports = async function gis(searchTerm, options = {}) {
  if (!searchTerm || typeof searchTerm !== 'string')
    throw new TypeError("searchTerm must be a string.");

  if (typeof options !== 'object')
    throw new TypeError("options argument must be an object.");

  const {
    query = {},
    filterOutDomains = ['gstatic.com'],
    userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
    disableDoubleHTTP = true
  } = options;


  const body = await fetch(`http://www.google.com/search?${new URLSearchParams({ ...query, tbm: "isch", q: searchTerm })}`, {
    headers: {
      'User-Agent': userAgent
    }
  }).then(res => res.text());

  const content = parse(body).getElementsByTagName('script').filter(
    script => script.childNodes?.length && IMAGE_EXTENSIONS.some(a => script.childNodes[0].text.toLowerCase().includes(a))
  )

  const results = [];

  let result;

  while ((result = REGEX.exec(content)) !== null)
    if (result.length > 3 && filterOutDomains.every(skipDomain => !result[1].includes(skipDomain)))
      results.push({
        url: disableDoubleHTTP ? `http${result[1].split("http")[1]}` : result[1],
        height: +result[2],
        width: +result[3]
      });

  return results;

}