import express from 'express';
import psList from 'ps-list';

import fs from 'fs';
import { Console } from 'console';
import ChildProcess from 'child_process';

const ioRouter = (io) => {
    const router = express.Router();
    router.use('/', ws(io));
    return router;
};

const ws = (io) => {

    const lines = 50;
    const chatLog = logger(lines);
    
    if(!io.data) io.data = {};
    if(!io.data.messages) io.data.messages = {};
    if(!io.data.messages.global) io.data.messages.global = [];
    else throw Error('io.data.messages already exists');

    io.on('connection', (socket) => {
        
        socket.on('name', (username) => {
            socket.emit('init', io.data.messages.global)
            socket.username = username;
            chatLog(socket.id, 'connecting', socket.username);
        });

        socket.on('disconnecting', (reason) => {
            chatLog(socket.id, 'disconnecting', socket.username);
        });

        socket.on('message', (bcMsg) => {
            const global = io.data.messages.global;

            if(global.length === lines) global.shift();
            global.push({ username: socket.username, message: bcMsg });

            io.sockets.send({ username: socket.username, message: bcMsg });
            chatLog({ username: socket.username, message: bcMsg }, socket.id);
            
        });
    });
    return (req, res, next) => {};
}

const logger = (linesP) => {
    const lines = linesP;
    const chatfile = './fpChatLog.log';
    let tailTerminal,
        isTail;

    const checkLength = () =>{
        const temp = fs
            .readFileSync(chatfile)
            .toString()
            // .replace(/[\x00]/g, '')     // remove null bytes in string
            .split('\n');

        if(temp.length > lines) {
            temp.shift();
            const buffer = temp.join('\n');
            fs.writeFileSync(chatfile, buffer, { flag: 'w' });
        }
    }

    const chatLog = (...args) => {
        checkLength();
        chatConsole.log(args);
    }

    const stream = fs.createWriteStream(chatfile, { flags: 'w' });

    // kill lost process instance & nodemon restart cleaning
    const getTail = async () => {
        isTail = (await psList()).find(item => item.cmd.includes(chatfile) && item.name === 'tail');
        return isTail;
    };
    getTail().then(() => {
        if(isTail) process.kill(isTail.pid);
    });

    // create new logging terminal process
    if(process.platform === 'linux')
    tailTerminal = ChildProcess.spawn(
        'gnome-terminal',
        [ '--window', '--wait', '--', 'tail', '-fn', lines * 10, chatfile]
    );
    if(process.platform === 'win32')
    tailTerminal = ChildProcess.spawn(
        'powershell',
        [ '-NoExit', '-Command', 'Get-Content', chatfile, '-Tail', lines * 10, '-Wait' ]
    );

    tailTerminal.on('exit', (code) => {
        console.log('child process tailTerminal exited by parent process with code', code.toString());
    });
    
    // tailTerminal.stdout.on('data', (data) => {
    //     stream.write(data);
    // }),
    // tailTerminal.stderr.on('data', (data) => {
    //     stream.write(data);
    // })
    // tailTerminal.stdout.emit('data', 'test');

    setTimeout(async () => {
        isTail = await getTail();
        if(isTail) {
            process.on('exit', (code) => {
                stream.end();
                tailTerminal.kill();
                process.kill(isTail.pid)
            });
        }
    }, 1000);
        
    const chatConsole = new Console(stream, stream);

    return chatLog;
}

export default ioRouter;