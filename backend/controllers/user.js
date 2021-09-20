import bcrypt from 'bcrypt';

import { errorOptions } from '../lib/errors.js';
import User from '../models/User.js';

const deleteUser = async (req, res, next) => {
    try {
        const temp = await User.deleteUser(req.body.email);
        res.status(200).json(temp);
    } catch (e) {
        next(errorOptions(e));
    }
}

const register = async (req, res, next) => {
    try {
        const hashedPw = await bcrypt.hash(
            req.body.password + process.env.PEPPER,
            +process.env.SALT_ROUNDS
        );

        await User.register(
            req.body.username,
            req.body.email,
            hashedPw,
            req.body.birthDate,
            req.body.firstName || '',
            req.body.lastName || ''
        );

        next(); //login
    } catch (e) {
        next(errorOptions(e, 'register'));
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