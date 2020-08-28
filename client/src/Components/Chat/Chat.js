import React, {useState, useEffect} from 'react'
import reactEmoji from "react-emoji";
import InfoChatBar from '../Chat/InfoChatBar/InfoChatBar'
import ChatInput from '../Chat/ChatInput/ChatInput'
import ChatMessages from './ChatMessages/ChatMessages'
import {socket} from '../socket'

import './Chat.css'

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [playerName, setPlayer] = useState('');
    const [playerRoom, setPlayerRoom] = useState('');

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
            
        });
    }, [messages]);

    useEffect(() => {
        socket.on('getPlayerName', (playerName) => {
            console.log('passando nome do jogador para Chat.js')
            setPlayer(playerName)
        })

    }, [])

    useEffect(() => {
        socket.on('getPlayerRoom', (playerRoom) => {
            console.log('passando nome da sala para Chat.js')
            setPlayerRoom(playerRoom)
        })

    }, [])

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
                  <InfoChatBar room={playerRoom} />
                  <ChatMessages messages={messages} name={playerName} />
                  <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
              </div>
            </div>
          );
    }

export default Chat;
