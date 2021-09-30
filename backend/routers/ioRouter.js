import express from 'express';

const ioRouter = (io) => {
    const router = express.Router();
    router.use('/', ws(io));
    return router;
};

const ws = (io) => {

    io.on('connection', (socket) => {
        console.log(socket.id, 'connecting');

        socket.send('connected');
        socket.on('name', (username) => {
            socket.username = username;
        });

        socket.on('disconnecting', (reason) => {
            console.log(socket.id, 'disconnecting');
        });

        socket.on('message', (bcMsg) => {
            console.log(socket.username, bcMsg);
            io.sockets.send(socket.username, bcMsg);
        });
    });
    return (req, res, next) => {};
}

export default ioRouter;