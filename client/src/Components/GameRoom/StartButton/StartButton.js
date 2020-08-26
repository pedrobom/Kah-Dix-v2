import React from 'react'
import './StartButton.css'
import { socket } from '../../socket'


const StartButton = props =>{
    
    function startGame(e) {
        e.preventDefault();
        socket.emit('gameStart');       
    
        console.log(props)
    }

    return (

        // <div className="start-button" onClick={e => startGame(e)}>INICIAR PARTIDA</div>
       
        <div id="background-start-button">
            <div id="wrapper">
                <a href="#" class="my-super-cool-btn">
                    <div class="dots-container">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    </div>
                    <span onClick={e => startGame(e)}>Go!</span>
                </a>
                
                <h1>Esperando demais Jogadores!</h1>
                
            </div>
        </div>

    )     
}

export default StartButton