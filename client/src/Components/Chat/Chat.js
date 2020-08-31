import React, {useState, useEffect, useContext} from 'react'
import reactEmoji from "react-emoji";
import InfoChatBar from '../Chat/InfoChatBar/InfoChatBar'
import ChatInput from '../Chat/ChatInput/ChatInput'
import ChatMessages from './ChatMessages/ChatMessages'
import {socket} from '../socket'
import { RoomContext } from '../GameRoom/GameRoom'

import './Chat.css'

const Chat = () => {
    const roomData = useContext(RoomContext)

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
            console.log('Socket emited SendMessage')

        }
    }

        return (
            <div className="outerContainer">
              <div className="container">
                  <InfoChatBar />
                  <ChatMessages messages={messages} />
                  <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
              </div>
            </div>
          );
    }

export default Chat;
