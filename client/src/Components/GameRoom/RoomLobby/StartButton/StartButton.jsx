import React from 'react'
import './StartButton.css'

import { socket } from '../../../socket'

function StartButton (){
    
    function startGame(e) {
        e.preventDefault();
        socket.emit('gameStart');      
        console.log('socket emit gameStart') 
    }

    return (                 
        <a href="#" class="my-super-cool-btn">
            <div class="dots-container">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>  
            <span onClick={e => startGame(e)}>Go!</span>
        </a>    
    )     
}

export default StartButton