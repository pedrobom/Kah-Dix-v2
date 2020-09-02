import React from 'react'
import './Hand.css'
import { useState, useEffect } from 'react'
import { socket } from '../../socket'

import Card from '../Card/Card'
import AllCards from '../../allCards'
import { useContext } from 'react'
import{ RoomContext } from '../GameRoom'


export default function Hand () {
    const roomData = useContext(RoomContext)
    const cardsArray = AllCards()

    //ENCONTRAR UMA FORMA MAIS EFICIÊNTE DE FAZER ISSO!
    const renderCards = () => {   
        
        const getCardInfo = cardInput => cardsArray.find(card => card.cardTitle === cardInput)

        return roomData.myHand.map((card, index) => {            
            let cardInfo = getCardInfo(card)
            return (
                <Card 
                    key={index} 
                    id={cardInfo.cardTitle}
                    src={cardInfo.src} 
                    alt={`Imagem da carta: ${cardInfo.cardTitle}`}
                />
            )            
        })
    }

    
    return(
        <div className="player-hand">
            {renderCards()}
        </div>
    )
}