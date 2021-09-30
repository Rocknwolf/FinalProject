import React, { useEffect, useContext, useState } from 'react'
import { io } from 'socket.io-client';
import { globalContext } from '../App.js';

const Chat = () => {
    const context = useContext(globalContext);
    const [socket, setSocket] = useState();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setSocket(socketInstance.connect());
        return () => {
            if(socket) socket.disconnect();
            setMessages([ 'disconnected' ]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(socket){
            socket.on('connect', () => {
                socket.emit('name', context.username);
            });
            socket.on('message', (name, msg) => {
                if(messages.length === 50) messages.shift();
                messages.push([ name, msg ]);
                console.log(messages);
                setMessages([...messages]);
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    const socketInstance = io('ws://localhost:4200', {
        path: '/api/ws/',
        autoConnect: false,
        upgrade: false
    });

    const submitHandler = (e) => {
        e.preventDefault();
        const sendMessage = e.target.querySelector('#sendMessage').value
        socket.send(sendMessage);
    }

    return (
        <div>
            <div>Chat</div>
            <div className="chatBox">
                <div className="chatMessages">
                    <div>
                        {
                            messages
                        }
                    </div>
                </div>
                <form action="" onSubmit={ submitHandler }>
                    <input type="text" id="sendMessage" />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}

export default Chat
