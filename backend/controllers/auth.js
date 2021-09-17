import bcrypt from 'bcrypt';

import { errorOptions } from '../lib/errors.js';
import User from '../models/User.js';

const login = async (req, res, next) => {
    try {
        let hashedPw;
        // if(req.body.username)
        //     hashedPw = await User.findByUsername(req.body.username);
        // if(req.body.email && !hashedPw)
        //     hashedPw = await User.findByUsername(req.body.email);

        hashedPw = "$2b$10$cVuFs.DgOd3gp20KRCCEIueLbJQeEjZxr6uXpJphMNmtnD9aY3g4q";

        const check = await bcrypt.compare(req.body.password + process.env.PEPPER, hashedPw);

        if(check) {
            res.status(201);
            res.payload = { login: "accepted" };
            return next();
        }
        throw new Error('wrong password');
    } catch (e) {
        next(errorOptions(e, 'login', 400, true));
    }
}

const logout = async (req, res, next) => {
    try {
        res.payload = { login: false };
        const tbl = res.app.locals.states.tokenBlacklist;
        tbl.push(req.token);
        res.status(200);

        return next();
    } catch (e) {
        next(errorOptions(e, 'logout'));
    }
}

export default {
    login,
    logout
}