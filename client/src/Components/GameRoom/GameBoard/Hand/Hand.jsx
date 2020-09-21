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


    useEffect(() => {
        const cards = document.querySelectorAll('.card.hand')        
        
        if (roomData.state === "SELECTING_CARDS")
        {
            cards.forEach(card => {
                card.classList.add("selectingCards")
    
                // Começou a arrastar a carta
                card.addEventListener("mousedown", () => {
                    card.classList.add("onMouseDown")
                })     
                
                // TDS AS POSSIBLIDADES DE SOLTAR O BOTÃO E ARRASTE
                card.addEventListener("mouseup", () => {
                    card.classList.remove("onMouseDown")
                })
                card.addEventListener("mouseleave", () => {
                    card.classList.remove("onMouseDown")
                })
                card.addEventListener("drop", () => {
                    card.classList.remove("onMouseDown")
                })
                card.ondragstart = e => {
                    console.log("Carta sendo arrastada")
                    e.dataTransfer.setData('card-id', e.target.id)
                } 
            })

     
        } 
        else if (roomData.state !== "SELECTING_CARDS")
        {
            cards.forEach(card => {
                if(card.getAttribute('class', 'selectingCards')){
                    card.classList.remove('selectingCards')

                    // REMOVENDO EVENT LISTENERS DO TURNO PASSADO:
                    card.removeEventListener("mousedown", () => {
                        card.classList.add("onMouseDown")
                    })                         
                    card.removeEventListener("mouseup", () => {
                        card.classList.remove("onMouseDown")
                    })
                    card.removeEventListener("mouseleave", () => {
                        card.classList.remove("onMouseDown")
                    })
                    card.removeEventListener("drop", () => {
                        card.classList.remove("onMouseDown")
                    })
                    card.removeEventListener("dragstart", e => {
                        console.log("Carta sendo arrastada")
                        e.dataTransfer.setData('card-id', e.target.id)
                    })
                }
            })
        }

    })


    //ENCONTRAR UMA FORMA MAIS EFICIÊNTE DE FAZER ISSO!
    const renderCards = () => {   
        if(roomData.myHand !== []){
            const getCardInfo = cardInput => cardsArray.find(card => card.cardTitle === cardInput)
            return roomData.myHand.map((card, index) => {            
                let cardInfo = getCardInfo(card)
                console.log('hand card', card)
                return (
                    <Card 
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