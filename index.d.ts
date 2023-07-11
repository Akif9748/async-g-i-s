interface Result {
    url: string;
    height: number;
    width: number;
    color: [number, number, number];
}

interface Options {
    query?: object = {};
    userAgent?: string = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';
    newRegex?: boolean = true;
}

/**
 * 
 * Async version of g-i-s module
 * @async
 * @param {String} searchTerm Search term for search
 * @param {Options} options Options for search
 * @param {Object} options.query You can use custom query
 * @param {String} options.userAgent User agent for request
 * @param {Boolean} options.newRegex Better filtering, if you want to find everything, set as false
 * @returns {Promise<Result[]>} Array of results
 */
export default async function gis(searchTerm: string, options?: Options): Promise<Result[]>;