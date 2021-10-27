const errorOptions = (err, action, status, emptyRespond, sendErrorMessage, forceOverwright, additionalSendValue) =>
{
    err.action = action || null;
    err.status = status || err.status || 500;
    err.empty = emptyRespond;
    err.additionalSendValue = additionalSendValue;

    if(err.isCastError && sendErrorMessage) err.reason.sendErrorMessage = sendErrorMessage;
    if(!err.isCastError && sendErrorMessage) {
        if(forceOverwright || !err.sendErrorMessage) err.sendErrorMessage = sendErrorMessage;
    }
    else err.sendErrorMessage = err.message;
    return err;
};

const notFoundError = (identifier, cause) => { 
    const err = new Error(identifier + ' not found');
    err.status = 404;
    err.cause = cause;
    return err;
};

export {
    errorOptions,
    notFoundError
};