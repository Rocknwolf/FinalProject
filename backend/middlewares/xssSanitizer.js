import { errorOptions } from '../Lib/errors.js';
import xss from 'xss';

const xssSanitize = (objName, keyName) => {
    const options = {
        whiteList: {},
        stripIgnoreTag: true,
        stripIgnoreTagBody: ['script']
    };
    const xssFilter = new xss.FilterXSS(options);
    return (req, res, next) => {
        req[objName].sanitized = xssFilter.process(req[objName][keyName]);

        if(req[objName].sanitized !== req[objName][keyName])
            return next(errorOptions(
                { name: 'Error', cause: req[objName][keyName] },
                'urlSanitize',
                422,
                true,
                'injection'
            )
        );
        next();
    }
}

export default xssSanitize;