const fetch = global.fetch || require("node-fetch");
const REGEX = /\["(\bhttps?:\/\/[^"]+)",(\d+),(\d+)\],null/g;

/**
 * @param {string} content
 * @returns {string}
 */
const unicodeToString = content =>
  content.replace(/\\u[\dA-F]{4}/gi, match => String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16)));

/**
 * 
 * Async version of g-i-s module
 * @async
 * @param {String} searchTerm Search term to search
 * @param {Object} options Options for search
 * @param {Object} options.query You can use a custom query
 * @param {String} options.userAgent User agent for request
 * @returns {Promise<[{url: string, height: number, width: number }]>} Array of results
 */
module.exports = async function gis(searchTerm, options = {}) {
  if (!searchTerm || typeof searchTerm !== "string") throw new TypeError("searchTerm must be a string.");
  if (typeof options !== "object") throw new TypeError("options argument must be an object.");

  const {
    query = {},
    userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
  } = options,
    body = await fetch(`http://www.google.com/search?${new URLSearchParams({ ...query, udm: "2", tbm: "isch", q: searchTerm })}`, { headers: { "User-Agent": userAgent } }).then(res => res.text()),
    content = body, // will fix
    results = [];

  let result;

  while (result = REGEX.exec(content))
    results.push({
      url: unicodeToString(result[1]),
      height: +result[2],
      width: +result[3]
    });

  return results;
}
