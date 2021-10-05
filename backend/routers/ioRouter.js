import express from 'express';

const ioRouter = (io) => {
    const router = express.Router();
    router.use('/', ws(io));
    return router;
};

const ws = (io) => {

    if(!io.data) io.data = {};
    if(!io.data.messages) io.data.messages = {};
    if(!io.data.messages.global) io.data.messages.global = [];
    else throw Error('io.data.messages already exists');

    io.on('connection', (socket) => {
        
        socket.on('name', (username) => {
            socket.emit('init', io.data.messages.global)
            socket.username = username;
            console.log(socket.id, 'connecting', socket.username);
        });

        socket.on('disconnecting', (reason) => {
            console.log(socket.id, 'disconnecting', socket.username);
        });

        socket.on('message', (bcMsg) => {
            if(io.data.messages.global.length === 50) io.data.messages.global.shift();
            io.data.messages.global.push({ username: socket.username, message: bcMsg });

            io.sockets.send({ username: socket.username, message: bcMsg });
            console.log({ username: socket.username, message: bcMsg }, socket.id);

            //console.log(io)
        });
    });
    return (req, res, next) => {};
}

export default ioRouter;