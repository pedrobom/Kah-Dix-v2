import React from 'react'
import { socket } from '../../socket'


const StartButton = props =>{
    
    function startGame(e) {
        e.preventDefault();
        socket.emit('gameStart');
        console.log(props)
    }

    return (
        <React.Fragment>
            <button  className="StartButton" onClick={e => startGame(e)}>INICIAR PARTIDA</button>
        </React.Fragment>
    )     
}

export default StartButton