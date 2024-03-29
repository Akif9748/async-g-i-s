interface Result {
    url: string;
    height: number;
    width: number;
    color: [number, number, number];
}

interface Options {
    query?: object;
    userAgent?: string;
}

/**
 * 
 * Async version of g-i-s module
 * @async
 * @param {String} searchTerm Search term to search
 * @param {Options} options Options for search
 * @param {Object} options.query You can use a custom query
 * @param {String} options.userAgent User agent for request
 * @returns {Promise<Result[]>} Array of results
 */
export default function gis(searchTerm: string, options?: Options): Promise<Result[]>;
