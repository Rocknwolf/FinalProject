import mongoose from 'mongoose';

const errorHandler = (err, req, res, next) => {
    if(process.env.USE_ERROR_STACK === 'false') err.stack = '';
    console.error(Date.now(),'\n' + err.action, err, '\n');
    res = res.status(err.status);

    const returnMessage = err instanceof mongoose.CastError ? err.reason.sendMessage : err.sendMessage;
    !err.empty ? res.json({ message: returnMessage }) : res.json();
};

export default errorHandler;