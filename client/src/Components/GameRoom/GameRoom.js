import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from 'socket.io-client'
import InfoChatBar from '../InfoChatBar/InfoChatBar'
import ChatInput from '../ChatInput/ChatInput'
import ChatMessages from '../ChatMessages/ChatMessages'

import './GameRoom.css'

let socket;

const GameRoom = ({ location }) => { 

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ENDPOINT = 'https://kah-dix.herokuapp.com/';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, (error) => {
            if(error) {
              alert(error);
            }
          });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }

        
    }, [ENDPOINT, location.search]);


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


    console.log(message, messages)

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

export default GameRoom