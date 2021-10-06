import config from '../config.js';

/**
 * Predefined fetch for cors mode with body restiction in GET method
 * 
 * @param {String} path host internal path to use
 * @param {String} method rest method to use
 * @param {Object} body optional to use as body
 * @param {Object} options optional to use for options - in work - only headers supported
 * @returns Promise
 */
const fetchCors = async (path, method, body, options) => {
    const _body = body || null;
    let headers;
    if(options) {
        if(options.headers) headers = options.headers;
        else headers = { 'Content-Type': 'application/json;charset=UTF-8' };
    }
    else headers = { 'Content-Type': 'application/json;charset=UTF-8' };

    const _options = {
        method: method,
        headers: headers,
        mode: 'cors',
        credentials: config.fetch_credentials,
        [method.toUpperCase() !== 'GET' ? 'body' : null] : method.toUpperCase() !== 'GET' ? _body : null
    };
    try {
        return await fetch(config.host + path, _options);
    } catch (e) {
        console.error(e);
    }
}

export default fetchCors;