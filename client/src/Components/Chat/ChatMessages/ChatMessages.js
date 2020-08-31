import React, { useContext } from 'react';
import { RoomContext } from '../../GameRoom/GameRoom'

import ScrollToBottom from 'react-scroll-to-bottom';

import ChatMessage from './ChatMessage/ChatMessage';

import './ChatMessages.css';

const ChatMessages = ({ messages}) => {
  const roomData = useContext(RoomContext)
  return (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><ChatMessage message={message}/></div>)}
  </ScrollToBottom>    
  )
}


export default ChatMessages;