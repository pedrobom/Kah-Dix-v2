import React, { useContext } from 'react';
import { RoomContext } from '../../GameRoom/GameRoom'

import onlineIcon from '../../../assets/icons/onlineIcon.png';
import arrowIcon from '../../../assets/icons/arrow.png'

import './InfoChatBar.css';

const InfoChatBar = () => {
  const roomData = useContext(RoomContext)

  const clickArrow = e => {
    e.preventDefault()
    const chatContainer = document.querySelector('.container')
    const chatInfoBar = document.querySelector('.infoBar')

    chatContainer.classList.toggle('hide')
    chatInfoBar.classList.toggle('chat-hide')
  }


  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
        <h3>Bate-Papo Sala: {roomData.name} </h3>        
      </div>
      <div className="rightInnerContainer">
        <img className="arrow-down-icon" src={arrowIcon} alt="online icon" 
          onClick={e => clickArrow(e)}
        />
      </div>
  </div>
  )

};

export default InfoChatBar;