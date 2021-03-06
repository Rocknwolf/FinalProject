import jwt from 'jsonwebtoken';

import { errorOptions } from '../lib/errors.js';

const durationJWT = +process.env.TOKEN_DURATION * 60

const setTokenCookie = (res, token, duration) => res.cookie('token', token, {
    maxAge: duration * 1000, //in ms
    httpOnly: false,
    sameSite: process.env.COOKIE_SAMESITE,
    secure: process.env.COOKIE_SAMESITE === 'None' ? true : false,
    path: '/'
});

const setToken = (res, duration, object) => {
    const options = {
        algorithm: 'HS256',
        expiresIn: duration  //in s
    }
    return jwt.sign(res.payload || object, process.env.TOKEN_SECRET, options);
};

/**
 * 
 * @param {number} durationP optional - in seconds - default = 0
 * @returns closure middleware function
 */
const signToken = (durationP) =>
{
    const duration = durationP || 0;
    return (req, res, next) => {
        
        const token = setToken(res, duration);
        setTokenCookie(res, token, duration);

        res.json(res.message);
    }
}

const verifyToken = (req, res, next) => {
    try {
        let tokenVerified;
        if(req.cookies.token !== undefined)
            tokenVerified = jwt.verify(
                req.cookies.token,
                process.env.TOKEN_SECRET,
                { algorithm: 'HS256' , complete: true }
            );
        else throw errorOptions(Error(), null, null, false, 'missing token');
        
        if( !res.app.locals.states.tokenBlacklist
            .map(item => item.signature)
            .includes(tokenVerified.signature)
        ) req.token = { exp: tokenVerified.payload.exp * 1000, signature: tokenVerified.signature };
        else throw new Error();

        //token refresh expiring in < 2 min
        if((tokenVerified.payload.exp - Date.now() / 1000) / 60 < process.env.TOKEN_RENEW) {
            const token = setToken(res, durationJWT , { authentication: 'renewed'});
            setTokenCookie(res, token, durationJWT);
        }
        next();
    } catch (e) {
        next(errorOptions(e, 'verifyToken', 401, false, 'invalid token'));
    }
}

export default {
    signToken,
    verifyToken,
    setToken
}