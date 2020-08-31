import React, { useContext } from 'react';
import { RoomContext } from '../../GameRoom/GameRoom'

import onlineIcon from '../../../icons/onlineIcon.png';

import './InfoChatBar.css';

const InfoChatBar = () => {
  const roomData = useContext(RoomContext)

  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>Bate-Papo Sala: {roomData.name} </h3>
      </div>
    <div className="rightInnerContainer">
    </div>
  </div>
  )

};

export default InfoChatBar;