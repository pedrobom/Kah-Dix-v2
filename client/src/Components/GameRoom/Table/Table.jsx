import React, {useEffect, useState, useContext } from 'react'
import './Table.css'
import { socket } from '../../socket'
import{ RoomContext } from '../GameRoom'
import InputPrompt from '../InputPrompt/InputPrompt'
import AllCards from '../../allCards'
import cardBackSrc from '../../../assets/images/cardBack'
import Card from '../Card/Card'

export default function Table() {
    
    const roomData = useContext(RoomContext)
    const cardsArray = AllCards()
    
 

    useEffect(() => {
        const dropzone = document.querySelector('[dixit-drop-zone=drop]')
        
        if (roomData.state === "SELECTING_CARDS"){
            
            dropzone.ondragover = e => e.preventDefault()
            dropzone.ondrop = function(e){
                console.log('soltando card')
                    const id = e.dataTransfer.getData('card-id')
                    const card = document.getElementById(id)
                    console.debug("Carta sendo dropada:")
                    console.debug(card)
                    card
                        ? playerSelectedACard(card)
                        : console.log("A carta parece não existir! Verifique se o event listener 'ondragstart' está captando as informações corretamente")                
                }
        }

    }, [roomData])

    
    function playerSelectedACard(cardElement){
        console.log('playerSelectedACard', cardElement.id)
        socket.emit('selectCard', cardElement.id, (error) => {
            if(error) {
                alert(error);
            }
        });
    }

    const renderCardBack = () => {
        if(roomData.state == "SELECTING_CARDS"){
            let cardsBackCount = roomData.selectedCardCount
            console.log('cardsBackCount:',cardsBackCount)
            let cardsBackArray = []
            for (let i = 0; i < cardsBackCount; i++){
                cardsBackArray.push(cardBackSrc)
                console.log("cardsBackArray", cardsBackArray)
            }

            return cardsBackArray.map( (cardBack, index) => {
                return(
                    <Card
                        key={index}
                        class={""} 
                        src={cardBack}
                    />
                )
            })

        }            
    }

 
    const renderVotingCards = () => {
        const getCardInfo = cardInput => cardsArray.find(card => card.cardTitle === cardInput)

        if(roomData.state == "VOTING"){
            return roomData.votingCardsTurn.map((card, index) => {
                let cardInfo = getCardInfo(card)
                return(
                    <Card 
                        key={index} 
                        class={'votingCards'}
                        id={cardInfo.cardTitle}
                        src={cardInfo.src} 
                        alt={`Imagem da carta: ${cardInfo.cardTitle}`}
                />
                )
            })                
        }
    }            

    return(
        <div className="dealer-table" dixit-drop-zone="drop">
            { roomData.state === "PICKING_PROMPT" && <InputPrompt /> }
            {renderCardBack()}
            {renderVotingCards()}
        </div>
    )
}