import jwt from 'jsonwebtoken';

import { errorOptions } from '../lib/errors.js';

const setTokenCookie = (res, token) => res.cookie('token', token, {
    maxAge: 20 * 60 * 1000, //in ms
    httpOnly: true
});

const setToken = (res, object) => {

    const options = {
        algorithm: 'HS256',
        expiresIn: 20 * 60  //in s
    }
    return jwt.sign(res.payload || object, process.env.TOKEN_SECRET, options);
};

const signToken = (reg, res, next) => {
    
    const token = setToken(res);
    setTokenCookie(res, token);
    
    res.send();
}

const verifyToken = (req, res, next) => {
    try {
        let tokenVerified;
        if(req.cookies.token !== undefined)
            tokenVerified = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET, { algorithm: 'HS256' })
        else return res.status(401).send('missing token');
        
        // console.log('token expires in', (tokenVerified.exp - Date.now() / 1000) / 60);
        // console.log(tokenVerified)

        //token refresh expiring in < 2 min
        if((tokenVerified.exp - Date.now() / 1000) / 60 < 2) {
            const token = setToken(res, { authentication: 'renewed'});
            setTokenCookie(res, token);
        }
        next();
    } catch (e) {
        next(errorOptions(e, 'verify token', 401, false, 'invalid token' ));
    }
}

export default {
    signToken,
    verifyToken
}