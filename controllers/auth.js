import bcrypt from 'bcrypt';

import { errorOptions, notFoundError } from '../lib/errors.js';
import User from '../models/User.js';

const login = async (req, res, next) => {
    try {
        let user, hashedPw;
        if(req.body.username)
        {
            user = await User.findByUsername(req.body.username.toLowerCase());
            if(user) hashedPw = user.password;
        }
        if(req.body.email && !hashedPw){
            user = await User.findByEmail(req.body.email);
            if(user) hashedPw = user.password;
        }

        if(!user) throw notFoundError('user', 'user not in db');
        const check = await bcrypt.compare(req.body.password + process.env.PEPPER, hashedPw);
        if(check) {
            res.status(201);
            res.payload = { login: 'accepted' };
            res.message = { value: { auth: true } };
            if(!user.isEmailVerified) res.message.message = 'Pending Account. Please Verify Your Email!';
            return next();
        }
        throw new Error('wrong password');
    } catch (e) {
        next(errorOptions(e, 'login', 400, true, null, false, { auth: false }));
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