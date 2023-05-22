interface Result {
    url: string;
    height: number;
    width: number;
}

interface Options {
    query?: object = {};
    filterOutDomains?: string[] = ['gstatic.com'];
    userAgent?: string = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36';
    disableDoubleHTTP?: boolean = true;
}

/**
 * 
 * Async version of g-i-s module
 * @async
 * @param {String} searchTerm Search term for search
 * @param {Options} options Options for search
 * @param {Object} options.query You can use custom query
 * @param {[String]} options.filterOutDomains Not looking for these domains
 * @param {String} options.userAgent User agent for request
 * @param {Boolean} options.disableDoubleHTTP Disable double http in url, slow, and safe
 * @returns {Promise<Result[]>} Array of results
 */
export default async function gis(searchTerm: string, options?: Options): Promise<Result[]>