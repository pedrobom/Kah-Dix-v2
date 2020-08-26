import React, {useState, useEffect} from 'react'
import reactEmoji from "react-emoji";
import InfoChatBar from '../Chat/InfoChatBar/InfoChatBar'
import ChatInput from '../Chat/ChatInput/ChatInput'
import ChatMessages from './ChatMessages/ChatMessages'
import {socket} from '../socket'

import './Chat.css'

const Chat = ({name}, {room}) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));

        }
    }

        return (
            <div className="outerContainer">
              <div className="container">
                  <InfoChatBar room={room} />
                  <ChatMessages messages={messages} name={name} />
                  <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
              </div>
            </div>
          );
    }

export default Chat;
