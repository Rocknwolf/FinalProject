import Ajv from 'ajv';
import ajvFormats from 'ajv-formats';

// import { ErrorOptions } from '../Models/Errors.js';

import { errorOptions } from '../Lib/errors.js';


const ajv = new Ajv({ allErrors: true });
ajvFormats(ajv);

const validate = (input, action, schema, req, res, next) => {
    const test = ajv.compile(schema);
    const isValid = test(input);

    if(isValid) next();
    else {
        const error = new Error('invalid value');
        error.filter = test.errors;
        error.cause = input;
        next(errorOptions(
            error,
            action,
            400,
            false
        ), req, res);
    }
}

const validateParams = (schema) => {
    return (req, res, next) => {
        const input = req.params;
        const action = 'validateParams';
        
        validate(input, action, schema, req, res, next);
    }
}

const validateBody = (schema) => {
    return (req, res, next) => {    
        const input = req.body;
        const action = 'validateBody';
        
        validate(input, action, schema, req, res, next);
    }
}

const validateQuery = (schema) => {
    return (req, res, next) => {    
        const input = req.query;
        const action = 'validateQuery';
        
        validate(input, action, schema, req, res, next);
    }
}

export {
    validateParams,
    validateBody,
    validateQuery
};