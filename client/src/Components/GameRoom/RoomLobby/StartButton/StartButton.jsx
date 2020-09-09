import React from 'react'
import './StartButton.css'

import { socket } from '../../../socket'

function StartButton ({isDeckDixit, isDeckPeq, isDeckEuro, isDeckNude, victoryConditions}){
    console.log("isDeckDixit at StartButton", isDeckDixit)
    console.log("isDeckPeck at StartButton", isDeckPeq)
    console.log("isDeckEuro at StartButton", isDeckEuro)
    console.log("isDeckNude at StartButton", isDeckNude)
    console.log("victoryConditions at StartButton", victoryConditions)

    function startGame(e) {
        e.preventDefault();
        socket.emit('gameStart', isDeckDixit, isDeckPeq, isDeckEuro, isDeckNude, victoryConditions, (error) =>{
            if(error){
                alert(error)
            }
        });      
        console.log('socket emit gameStart') 
    }

    return (                 
        <a href="#" className="my-super-cool-btn">
            <div className="dots-container">
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