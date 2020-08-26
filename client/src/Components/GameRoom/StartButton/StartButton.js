import React, { useState, useEffect } from "react";
import { socket } from '../../socket'

const StartButton = props =>{
    const [hand, setHand] = useState([])

    useEffect(() => {
        socket.on('drawCards', cards => {
            setHand({
            hand: cards,
            })
            
        })     
    },[hand])
 
    

    const renderCards = () => {
        const { hand } = hand
        console.log(`cartas distribuidas: ${hand}`)
        return hand.map((card, index) => {
            return (
                <React.Fragment>
                    <div key={index}></div>
                    <div>{card}</div>   
                </React.Fragment>
                           
            )

        });

    }
    
    function startGame(e) {
        e.preventDefault();
        socket.emit('gameStart');
        console.log("botão start pressionado")
        renderCards()
    }

    return (
        <React.Fragment>
            <button  className="StartButton" onClick={e => startGame(e)}>INICIAR PARTIDA</button>
        </React.Fragment>
    )     
}

export default StartButton