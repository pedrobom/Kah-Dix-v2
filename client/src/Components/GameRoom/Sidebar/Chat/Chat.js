import React, { useState, useEffect } from 'react'
import reactEmoji from "react-emoji";
import ChatInput from './ChatInput/ChatInput'
import ChatMessages from './ChatMessages/ChatMessages'
import {socket} from '../../../socket'

import './Chat.css'

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.once('message', (message) => {
            console.log('ouvindo mensagem / Recebendo mensagem', message)
            setMessages([...messages, message])
            })

    }, [messages])


    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
            console.log('Socket emited SendMessage')
        }
    }

        return (  
            <div className="chat">
                <ChatMessages messages={messages} />
                <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
          );
    }

export default Chat;
