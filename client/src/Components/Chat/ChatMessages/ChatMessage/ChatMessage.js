import React, { useContext } from 'react';
import { RoomContext } from '../../../GameRoom/GameRoom'
import './ChatMessage.css';

import ReactEmoji from 'react-emoji';

const ChatMessage = ({ message: { text, user }}) => {
  const roomData = useContext(RoomContext)
  let isSentByCurrentUser = false;

  const trimmedName = roomData.myUserName.trim();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10 ">{user}</p>
          </div>
        )
  );
}

export default ChatMessage;