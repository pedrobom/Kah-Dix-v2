import React, {useEffect, useState, useContext } from 'react'
import './Table.css'
import { socket } from '../../socket'
import{ RoomContext } from '../GameRoom'
import AllCards from '../../allCards'
import cardBackSrc from '../../../assets/images/cardBack'
import Card from '../Card/Card'

export default function Table() {
    
    const roomData = useContext(RoomContext)
    const cardsArray = AllCards()
    
 

    useEffect(() => {
        const dropzone = document.querySelector('[dixit-drop-zone=drop]')
        
        dropzone.ondragover = e => e.preventDefault()
        dropzone.ondrop = function(e){
            console.log('soltando card')
                const id = e.dataTransfer.getData('card-id')
                const card = document.getElementById(id)
                console.debug("Carta sendo dropada:")
                console.debug(card)
                card
                    ? playerSelectedACard(card)
                    : console.debug("A carta parece não existir! Verifique se o event listener 'ondragstart' está captando as informações corretamente")                
            }
    }, [roomData])
    
    function playerSelectedACard(cardElement){
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

            return cardsBackArray.map(cardBack => {
                return(
                    <Card src={cardBack}/>
                )
            })

        }            
    }

    const voteCard = (card) => {
        socket.emit('voteCard', card, (error) =>{
            console.log('Jogador votou na carta: ', card)
            if(error){
               alert(error)
            }
            
        })
    }

    const renderVotingCards = () => {
        const getCardInfo = cardInput => cardsArray.find(card => card.cardTitle === cardInput)

        if(roomData.state == "VOTING"){
            return roomData.votingCardsTurn.map((card, index) => {
                let cardInfo = getCardInfo(card)
                return(
                    <Card 
                    key={index} 
                    id={cardInfo.cardTitle}
                    src={cardInfo.src} 
                    alt={`Imagem da carta: ${cardInfo.cardTitle}`}
                    onClick={voteCard()}
                />
                )
            })                
        }
    }            

    return(
        <div className="dealer-table" dixit-drop-zone="drop">
            {renderCardBack()}
            {renderVotingCards()}
        </div>
    )
}