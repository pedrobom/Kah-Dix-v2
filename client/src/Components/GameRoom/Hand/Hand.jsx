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
        })
    },[hand])

    //ENCONTRAR UMA FORMA MAIS EFICIÊNTE DE FAZER ISSO!
    const renderCards = () => {   
        
        if(hand.length == 0) return

        console.log("Array de cartas distribuídas para o jogador:")
        console.log(hand)

        const getCardInfo = cardInput => cardsArray.find(card => card.cardTitle === cardInput)

        return hand.map((card, index) => {            
            let cardInfo = getCardInfo(card)
            return (
                <Card 
                    key={index} 
                    src={cardInfo.src} 
                    alt={cardInfo.cardTitle}
                    id={`draggable-card-${index}`}/>
            )            
        })
    }

    
    return(
        <div className="player-hand" dixit-drop-zone="drop">
            {renderCards()}
        </div>
    )
}