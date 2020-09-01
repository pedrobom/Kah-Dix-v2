import React, {useEffect, useState, useContext } from 'react'
import './Table.css'
import { socket } from '../../socket'
import{ RoomContext } from '../GameRoom'

import cardBackSrc from '../../../assets/images/cardBack'
import Card from '../Card/Card'

export default function Table() {
    
    const roomData = useContext(RoomContext)
    
    useEffect(() => {
        const dropzone = document.querySelector('[dixit-drop-zone=drop]')
        
        dropzone.ondragover = e => e.preventDefault()
        dropzone.ondrop = function(e){
            const id = e.dataTransfer.getData('card-id')
            const card = document.getElementById(id)
            console.debug("Carta sendo dropada:")
            console.debug(card)
            card
                ? playerSelectedACard(card)
                : console.debug("A carta parece não existir! Verifique se o event listener 'ondragstart' está captando as informações corretamente")
        
        }
        

        
    }, [])
    
    function playerSelectedACard(elementToDestroy){
        socket.emit('selectCard', elementToDestroy.id)
        elementToDestroy.remove()
        console.log("Elemento 'card' foi removido com sucesso!")
    }

    const VotingCards = () => {
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

    return(
        <div className="dealer-table" dixit-drop-zone="drop">
            {VotingCards()}
        </div>
    )
}