import dotenv from 'dotenv';
import express from 'express';
import { Server as ioServer } from 'socket.io';
import cookieParser from 'cookie-parser';
import expressMongoSanitize from 'express-mongo-sanitize';

import database from './lib/db.mongoose.js';
import errorHandler from './middlewares/errorHandler.js';

import userRouter from './routers/user.js';
import authRouter from './routers/auth.js';
import ioRouter from './routers/ioRouter.js';
import etb from './lib/expressTokenBlacklist.js';

dotenv.config();
database.init();

const app = express();
etb.tokenBlackList(app);
const server = app.listen(process.env.PORT, () => 
console.log(`server listening on port ${process.env.PORT}`));

const io = new ioServer(server, {
    path: '/api/ws/',
    cors: {
        origin: process.env.CORS_FRONTEND,
        methods: ["GET", "POST"]
    },
    // transports: ["polling", "websocket"],
    // allowUpgrades: true,
    pingInterval: 25000,
    pingTimeout: 30000,
    upgradeTimeout: 20000
});


//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CORS_FRONTEND);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if(process.env.CORS_CREDENTIALS === 'true')
    res.header('Access-Control-Allow-Credentials', true);   // The only valid value for this header is true
    if (req.method === 'OPTIONS') { //cors preflight request method
        return res.status(200).send();
    }
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// This module searches for any keys in objects that begin with a $ sign or contain a ., from req.body, req.query or req.params

app.use(expressMongoSanitize({ replaceWith: '_' })); // default delete theese keys

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use('/api/ws', ioRouter(io, app));
app.use(express.static('build'));

app.delete('/api/exit', ((req, res) => {
    //res.status(404).json();
    process.exit(0);
}));

app.use(errorHandler);
app.get('/', (req, res) => {
    res.sendFile('build/index.html');
});
