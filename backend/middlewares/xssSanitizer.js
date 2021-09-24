import { errorOptions } from '../lib/errors.js';
import xss from 'xss';


const compare = (req, objName, objectAsArray, xssFilter, next) => {
    req[objName].sanitizedArray = 
        objectAsArray.map(item => [ item[0], xssFilter.process(item[1]) ]);

    req[objName].sanitizedArray.forEach((item, i) => {
        if(item[1] !== objectAsArray[i][1])
        return next(errorOptions(
            { 
                name: 'Error',
                cause: {
                    [objName]:{
                        [objectAsArray[i][0]]: objectAsArray[i][1]
                    }
                }
            },
            'urlSanitize',
            422,
            true,
            'injection'
        ));
    });
    next();
}

/**
 * 
 * @param {string} objName objectname as string
 * @param {string[] | string} keyNames array | list of keynames
 * @param {string[] | string} excludeKeys array | list of keynames
 * @returns 
 */
const xssSanitize = (objName, keyNames, excludeKeys) => {
    const options = {
        whiteList: {},
        stripIgnoreTag: true,
        stripIgnoreTagBody: ['script']
    };
    const xssFilter = new xss.FilterXSS(options);

    let objectAsArray;
    const excludeKeysArray = excludeKeys || [];
    if(!keyNames) {
        return (req, res, next) => {
            objectAsArray = Object.entries(req[objName])
                .filter(item => !excludeKeysArray.includes(item[0]));
            
            compare(req, objName, objectAsArray, xssFilter, next);
        }
    }

    if(keyNames) {
        const keyNamesArray = keyNames;
        return (req, res, next) => {
            objectAsArray = Object.entries(req[objName])
                .filter(item => keyNamesArray.includes(item[0]));
            
            compare(req, objName, objectAsArray, xssFilter, next);
        }
    }
}

export default xssSanitize;
