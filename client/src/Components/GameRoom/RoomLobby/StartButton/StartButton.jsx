import React from 'react'
import './StartButton.css'

import { socket } from '../../../socket'

function StartButton ({isDeckDixit, isDeckPeq}){
    console.log("isDeckDixit at StartButton", isDeckDixit)
    console.log("isDeckPeck at StartButton", isDeckPeq)

    function startGame(e) {
        e.preventDefault();
        socket.emit('gameStart', isDeckDixit, isDeckPeq, (error) =>{
            if(error){
                alert(error)
            }
        });      
        console.log('socket emit gameStart') 
    }

    return (                 
        <a href="#" className="my-super-cool-btn">
            <div class="dots-container">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>  
            <span onClick={e => startGame(e)}>Vai!</span>
        </a>    
    )     
}

export default React.memo(StartButton)