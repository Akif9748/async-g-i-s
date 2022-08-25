interface Result {
    url: string;
    height: number;
    width: number;
}

/**
 * 
 * Async version of g-i-s module
 * @async
 * @param {String} searchTerm Search term for search
 * @param {Object} query You can use custom query
 * @param {String[]} filterOutDomains Not looking for these domains
 * @param {Boolean} disableDoubleHTTP Disable double http in url, slow, and safe
 * @returns {Promise<Result[]>} Array of results
 */
export default async function gis(searchTerm: string, query: object = {}, filterOutDomains: string[] = ['gstatic.com'], disableDoubleHTTP: boolean = true): Promise<Result[]>