import React, { useEffect, useContext, useState } from 'react'
import { io } from 'socket.io-client';
import { globalContext } from '../App.js';

const Chat = () => {
    const context = useContext(globalContext);
    const [socket, setSocket] = useState();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(!context.isLogin) {
            if(socket) {
                socket.disconnect();
                setMessages([ { username: 'System', message: 'disconnected' } ]);
            }
        }
        if(context.isLogin) {
            if(!socket || !socket.connected) setSocket(socketInstance.connect());
        }
        return () => {
            if(socket) socket.disconnect();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context]);

    useEffect(() => {
        if(socket){
            socket.on('connect', () => {
                socket.emit('name', context.username);
                /** messages.push({ username: 'system', message: `${context.username} connected` }); **/
                /** setMessages([...messages]); **/

            });
            socket.on('init', (array) => {
                messages.push(...array);
                if(messages[0].username === 'System' && messages[0].message === 'disconnected')
                    messages[0].message = 'connected';
                setMessages([...messages]);

            });

            socket.on('message', (msgObj) => {
                if(messages.length === 50) messages.shift();
                messages.push(msgObj);
                setMessages([...messages]);
            });
        }
        else setMessages([...messages, { username: 'System', message: 'disconnected'} ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    const socketInstance = io('ws://localhost:4200', {
        path: '/api/ws/',
        autoConnect: false,
        upgrade: false
    });

    const submitHandler = (e) => {
        e.preventDefault();
        if(socket) {
            const sendMessage = e.target.querySelector('#sendMessage').value
            socket.send(sendMessage);
        }
    }

    return (
        <div className="chat">
            <div className="chatTopBackground">
                <h1 className="chatTitle" >Chat</h1>
            </div>
            
            <div className="chatBackground">
                <div className="chatBox">
                    <div className="chatMessages">
                        {
                            messages.map((item, id) => 
                                <div key={ id }>
                                    { `${item.username}: ${item.message}` }
                                </div>
                            )
                        }
                    </div>
                    <form className="inputChat" action="" onSubmit={ submitHandler }>
                        {/* <input type="text" id="sendMessage" maxlength="160" className="inputChatInput" /> */}
                            <textarea   
                                placeholder="Remember, be nice!" 
                                type="text" id="sendMessage"
                                cols="15" rows="5" 
                                maxLength="320" 
                                className="inputChatInput"
                                required>
                            </textarea>
                        <button type="submit" className="chatButton">Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chat
