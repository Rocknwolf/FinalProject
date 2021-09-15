import { errorOptions } from '../lib/errors.js';
import User from '../models/User.js';

const login = async (req, res, next) => {
    try {
        await User.login();
        return res.status(200).json();
    } catch (e) {
        next(errorOptions(e));
    }
}

const logout = async (req, res, next) => {
    try {
        await User.logout();
        return res.status(200).json();
    } catch (e) {
        next(errorOptions(e));
    }
}

export default {
    login,
    logout
}