import React, { useContext } from 'react';
import SessionContext from '../../../../../SessionContext'
import './ChatMessage.css';

import ReactEmoji from 'react-emoji';

export default ({ message }) => {
  const { session } = useContext(SessionContext)
  let isSentByCurrentUser = false;
  

  // Não há uma sessão ainda, vamos esperar para renderizar
  if (!session || !session.user) {
    return null
  }

  const trimmedName = message.user.trim();

  if(session.user.id  === message.userId) {
    isSentByCurrentUser = true;
  }

  let messageType = ''
  // É uma mensagem do usuário atual
  if (isSentByCurrentUser) {
    messageType = 'myMessage'
  } 
  // É uma mensagem do sistem
  else if (message.systemMessage) {
    messageType = 'systemMessage'
  } 
  // É uma mensagem de outro usuário
  else {
    messageType = 'otherMessage'
  }

  return (
    <div className={'chatMessage ' + messageType}>
      <div className="messageText">{ReactEmoji.emojify(message.text)}</div>
      <div className="userName" 
          title={message.systemMessage ? `Essa é uma mensagem do sistema, enviada às ${message.date}`: `Mensagem enviada por ${message.user} às ${message.date} :)`}>
            {trimmedName} 
            {message.systemMessage ? <i className='fas fa-bullhorn'></i> : ''}
      </div>
    </div>
  )

}