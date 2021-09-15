import { errorOptions } from '../lib/errors.js';
import User from '../models/User.js';

const deleteUser = async (req, res, next) => {
    try {
        const temp = await User.deleteUser();
        res.status(200).json(temp);
    } catch (e) {
        next(errorOptions(e));
    }
}

const register = async (req, res, next) => {
    try {
        const temp = await User.register();
        res.status(200).json(temp);
    } catch (e) {
        next(errorOptions(e));
    }
}

const resetPassword = async (req, res, next) => {
    try {
        const temp = await User.saveResettedPassword();
        res.status(200).json(temp);
    } catch (e) {
        next(errorOptions(e));
    }
}

const reactivate = async (req, res, next) => {
    try {
        const temp = await User.reactivate();
        res.status(200).json(temp);
    } catch (e) {
        next(errorOptions(e));
    }
}

const suspend = async (req, res, next) => {
    try {
        const temp = await User.suspend();
        res.status(200).json(temp);
    } catch (e) {
        next(errorOptions(e));
    }
}

export default {
    deleteUser,
    register,
    resetPassword,
    reactivate,
    suspend
}