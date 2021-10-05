import bcrypt from 'bcrypt';

import { errorOptions } from '../lib/errors.js';
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
        const check = await bcrypt.compare(req.body.password + process.env.PEPPER, hashedPw);
        if(check) {
            res.status(201);
            res.payload = { login: "accepted" };
            return next();
        }
        if (user.status != "Active") {
            return res.status(401).send({
              message: "Pending Account. Please Verify Your Email!",
            });
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