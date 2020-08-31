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