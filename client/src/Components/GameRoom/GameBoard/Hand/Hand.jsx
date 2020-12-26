import React from 'react'
import './Hand.css'
import { useState, useEffect } from 'react'
import Card from '../Card/Card'
import AllCards from '../../../allCards' 
import { useContext, useMemo } from 'react'
import GameContext from '../../GameContext/GameContext'
import Constants from '../../../../Constants'


function Hand () {
    console.log('renderizando Componente Hand')

    const { roomData, amICurrentPlayer, myPlayer, currentPlayer } = useContext(GameContext)
    const cardsArray = AllCards()

    //ENCONTRAR UMA FORMA MAIS EFICIÊNTE DE FAZER ISSO!
    const renderCards = () => {   
        if(roomData.myHand !== []){
            const getCardInfo = cardInput => cardsArray.find(card => card.cardTitle === cardInput)
            return roomData.myHand.map((card, index) => {            
                let cardInfo = getCardInfo(card)
                console.log('hand card', cardInfo)
                return (
                    <Card 
                        type="hand"
                        key={index} 
                        class={"hand"}
                        id={cardInfo.cardTitle}
                        src={cardInfo.src} 
                        alt={`Imagem da carta: ${cardInfo.cardTitle}`}
                    />                        
                )            
            })              
        }
          
    }

    
    return(
        <React.Fragment>
        <div className={"player-hand " + (amICurrentPlayer && roomData.state == Constants.RoomStates.PICKING_PROMPT ? 'iAmPickingPrompt' : '') }>
                {renderCards()}
        </div>            
        </React.Fragment>
    )
}

export default React.memo(Hand)