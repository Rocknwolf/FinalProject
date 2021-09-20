import { errorOptions } from '../lib/errors.js';

const regexValidation = (pattern, object, keyword) =>
{
    return(req, res, next) => {
        try {
            const value = req[object][keyword];
            if(!value.match(pattern)) throw new Error('regexMatch Error');
            next();
        } catch (e) {
            next(errorOptions(e, 'regexValidation', 400));
        }
    }
}

export default regexValidation;
