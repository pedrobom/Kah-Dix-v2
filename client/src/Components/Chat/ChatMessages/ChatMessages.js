import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import ChatMessage from './ChatMessage/ChatMessage';

import './ChatMessages.css';

const ChatMessages = ({ messages}) => {
  return (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><ChatMessage message={message}/></div>)}
  </ScrollToBottom>    
  )
}


export default React.memo(ChatMessages);