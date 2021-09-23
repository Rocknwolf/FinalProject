import config from '../config.js';

/**
 * Predefined fetch for cors mode with body restiction in GET method
 * 
 * @param {String} path host internal path to use
 * @param {String} method rest method to use
 * @param {Object} bodyParam optional to use as body
 * @returns Promise
 */
const fetchCors = async (path, method, bodyParam) => {
    const body = bodyParam || null;

    const options = {
        method: method,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
        credentials: process.env.FETCH_CREDENTIALS,
        [method.toUpperCase() !== 'GET' ? 'body' : null] : method.toUpperCase() !== 'GET' ? body : null
    };
    try {
        return await fetch(config.host + path, options);
    } catch (e) {
        console.log(e);
    }
}

export default fetchCors;