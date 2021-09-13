const errorOptions = (err, action, status, emptyRespond, message) =>
{
    err.action = action || null;
    err.status = status || err.status || 500;
    err.empty = emptyRespond && true;
    if(err.isCastError && message) err.reason.sendMessage = message;
    if(!err.isCastError && message) err.sendMessage = message;
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