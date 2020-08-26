import React from 'react'
import { socket } from '../../socket'


class StartButton extends React.Component {
    
    startGame(e) {
        e.preventDefault();
        socket.emit('gameStart'); 
    }

    

    render() {
       return (
        <button  className="StartButton" onClick={this.startGame}>INICIAR PARTIDA</button>
    ) 
    }
    
}

export default StartButton