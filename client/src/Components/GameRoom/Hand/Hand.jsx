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


    useEffect(() => {
        const cards = document.querySelectorAll('.card.hand')        
        console.log("Cards from document.querySelectorAll('.card.hand')", cards)
        
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

    }, [roomData])


    //ENCONTRAR UMA FORMA MAIS EFICIÊNTE DE FAZER ISSO!
    const renderCards = () => {   
        
        const getCardInfo = cardInput => cardsArray.find(card => card.cardTitle === cardInput)

        return roomData.myHand.map((card, index) => {            
            let cardInfo = getCardInfo(card)
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

    
    return(
        <div className="player-hand">
            {renderCards()}
        </div>
    )
}