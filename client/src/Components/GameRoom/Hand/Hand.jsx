import React from 'react'
import './Hand.css'
import { useState, useEffect } from 'react'
import { socket } from '../../socket'

import Card from '../Card/Card'
import AllCards from '../../allCards'


export default props =>
{
    const cardsArray = AllCards
    const [hand, setHand] = useState([])

    useEffect(() => {
        socket.on('newHand', (newHand) => {
            console.log('escutando socket newHand ')
            setHand(newHand)
            console.log(hand)

        }, [hand])
    })

    //ENCONTRAR UMA FORMA MAIS EFICIÊNTE DE FAZER ISSO!
    const renderCards = () => {   
        
        if(hand.length == 0) return

        console.log("Array de objetos carta vindo do server:")
        console.log(cardsArray)

        console.log("Array de cartas distribuídas para o jogador:")
        console.log(hand)

        return hand.map((card, index) => {
            for (let i = 0; i < cardsArray.length; i++){
                if(card == cardsArray[i].cardTitle){
                    return (
                        <Card key={index} src={cardsArray[i].src} alt={cardsArray[i].cardTitle}/>
                    )
                }
            } 
            
        })
    }

    
    return(
        <div className="player-hand" dixit-drop-zone="drop">
            {renderCards()}
        </div>
    )
}