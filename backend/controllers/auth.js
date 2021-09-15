import { errorOptions } from '../lib/errors.js';

const login = async (req, res, next) => {
    try {
        
    } catch (e) {
        next(errorOptions(e));
    }
}

const logout = async (req, res, next) => {
    try {
        
    } catch (e) {
        next(errorOptions(e));
    }
}

export default {
    login,
    logout
}