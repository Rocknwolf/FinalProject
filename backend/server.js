import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import expressMongoSanitize from 'express-mongo-sanitize';

import database from './lib/db.mongoose.js';
import errorHandler from './middlewares/errorHandler.js';

import userRouter from './routers/user.js';
import authRouter from './routers/auth.js';
import etb from './lib/expressTokenBlacklist.js';

dotenv.config();
database.init();

const server = express();
etb.tokenBlackList(server);

server.listen(process.env.PORT, () => 
    console.log(`server listening on port ${process.env.PORT}`));
    
//cors
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CORS_FRONTEND);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') { //cors preflight request method
        return res.status(200).send();
    }
    next();
});

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

// This module searches for any keys in objects that begin with a $ sign or contain a ., from req.body, req.query or req.params
server.use(expressMongoSanitize({ replaceWith: '_' })); // default delete theese keys

server.use('/api/user', userRouter);
server.use('/api/auth', authRouter);

server.use(errorHandler);
