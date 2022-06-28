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
 * @param {String} queryStringAddition You can add custom query
 * @param {String[]} filterOutDomains Not looking for these domains
 * @returns {Promise<Result[]>} Array of results
 */
export default async function gis(searchTerm: string, queryStringAddition: string = "", filterOutDomains: [string] = ['gstatic.com']): Promise<Result[]>