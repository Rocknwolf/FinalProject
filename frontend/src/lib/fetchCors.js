import config from '../config.js';

/**
 * Predefined fetch for cors mode with body restiction in GET method
 * 
 * @param {String} path host internal path to use
 * @param {String} methodP rest method to use
 * @param {Object} bodyParam optional to use as body
 * @returns Promise
 */
const fetchCors = async (path, methodP, bodyParam) => {
    const body = bodyParam || null;

    const options = {
        method: methodP,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
        credentials: config.fetch_credentials,
        [methodP.toUpperCase() !== 'GET' ? 'body' : null] : methodP.toUpperCase() !== 'GET' ? body : null
    };
    try {
        return await fetch(config.host + path, options);
    } catch (e) {
        console.log(e);
    }
}

export default fetchCors;