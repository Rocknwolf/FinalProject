const errorOptions = (err, action, status, emptyRespond, sendMessage, forceOverwright) =>
{
    err.action = action || null;
    err.status = status || err.status || 500;
    err.empty = emptyRespond;
    if(err.isCastError && sendMessage) err.reason.sendMessage = sendMessage;
    if(!err.isCastError && sendMessage) {
        if(forceOverwright || !err.sendMessage) err.sendMessage = sendMessage;
    }
    else err.sendMessage = err.message;
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