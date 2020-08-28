import React from 'react';

import onlineIcon from '../../../icons/onlineIcon.png';

import './InfoChatBar.css';

const InfoChatBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>Bate-Papo Sala: {room} </h3>
    </div>
    <div className="rightInnerContainer">
    </div>
  </div>
);

export default InfoChatBar;