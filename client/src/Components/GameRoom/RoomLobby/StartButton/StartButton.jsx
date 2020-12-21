import React from 'react'
import './StartButton.css'

import { socket } from '../../../socket'

function StartButton ({ready}){

    function startGame(e) {
        e.preventDefault();
        socket.emit('gameStart', (error) =>{
            if(error){
                alert(error)
            }
        });      
        console.log('socket emit gameStart') 
    }

    return (                 
        <a href="#" className={"my-super-cool-btn " + (ready ? "ready" : "")}>
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