import React from 'react'
import './Hand.css'
import { useState, useEffect } from 'react'
import Card from '../Card/Card'
import AllCards from '../../../allCards' 
import { useContext, useMemo } from 'react'
import{ RoomContext } from '../../GameRoom'
import SessionContext from '../../../SessionContext'
import Constants from '../../../../Constants'


function Hand () {
    console.log('renderizando Componente Hand')

    const roomData = useContext(RoomContext)
    const {session} = useContext(SessionContext)
    const cardsArray = AllCards()

    var myPlayer = useMemo(() => roomData.players.find((player) => player.id == session.user.id))
    var currentPlayer = useMemo(() => roomData.players[roomData.currentPlayerIndex])
    var amICurrentPlayer = useMemo(() => currentPlayer.id == myPlayer.id)


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