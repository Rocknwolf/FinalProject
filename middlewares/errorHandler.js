import mongoose from 'mongoose';

const errorHandler = (err, req, res, next) => {
    if(process.env.USE_ERROR_STACK === 'false') err.stack = '';
    console.error(Date.now(),'\n' + err.action, err, '\n');

    if(!res.finished) {
        res = res.status(err.status);
    
        const returnMessage = err instanceof mongoose.CastError ? err.reason.sendErrorMessage : err.sendErrorMessage;
        
        const errorObject = { error: { message: null } };
        errorObject.error.message = !err.empty ? returnMessage : null;
        if(err.additionalSendValue) errorObject.value = err.additionalSendValue;
    
        
        res.json(errorObject);
    };
}

export default errorHandler;