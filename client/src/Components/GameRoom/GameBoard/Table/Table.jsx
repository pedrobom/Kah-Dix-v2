import React, {useEffect, useState, useContext } from 'react'
import './Table.css'
import { socket } from '../../../socket'
import{ RoomContext } from '../../GameRoom'
import InputPrompt from '../InputPrompt/InputPrompt'
import AllCards from '../../../allCards'
import cardBackSrc from '../../../../assets/images/cardBack'
import Card from '../Card/Card'
import Constants from '../../../../Constants'
import SessionContext from '../../../SessionContext'

export default function Table() {
    
    const roomData = useContext(RoomContext)
    const {session} = useContext(SessionContext)
    const cardsArray = AllCards()
    
    var myPlayer = roomData.players.find((player) => player.id == session.user.id)
    var currentPlayer = roomData.players[roomData.currentPlayerIndex]
    var amICurrentPlayer = currentPlayer.id == myPlayer.id

    // Escutando drag/drop de cartas!
    useEffect(() => {
        const dropzone = document.querySelector('[dixit-drop-zone=drop]')
        
        if (roomData.state === "SELECTING_CARDS"){
            
            dropzone.ondragover = e => e.preventDefault()
            dropzone.ondrop = function(e){

                    e.preventDefault()
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

    // Devemos mostrar os resultados! (Acabaram de votar agora)
    function shouldShowVoteResults() {
        return roomData.state == Constants.RoomStates.PICKING_PROMPT && roomData.turn > 1
    }

    // Um jogador escolheu uma carta
    function playerSelectedACard(cardElement){
        console.log('playerSelectedACard', cardElement.id)
        socket.emit('selectCard', cardElement.id, (error) => {
            if(error) {
                alert(error);
            }
        });
    }

    // Renderizar as cartas escondidas caso ainda estejamos selecionadno elas
    const renderCardBack = () => {

        let cardsBackCount = roomData.selectedCardCount
        console.log('cardsBackCount:',cardsBackCount)

        let cardsBackArray = []
        for (let i = 0; i < cardsBackCount; i++){
            cardsBackArray.push(cardBackSrc)
            console.log("cardsBackArray", cardsBackArray)
        }

        return cardsBackArray.map( (cardBack, index) => {
            return(
                <div className="cardBackAtTable">
                    <Card
                        key={index}
                        class={""} 
                        src={cardBack}
                    />
                </div>
            )
        })
    }
 
    // Renderizar cartas com o desenho caso esteja na hora de votar :)
    const renderVotingCards = () => {
        const getCardInfo = cardInput => cardsArray.find(card => card.cardTitle === cardInput)
        return roomData.votingCardsTurn.map((card, index) => {
            let cardInfo = getCardInfo(card)
            return(
                    <Card 
                        key={index} 
                        class={`votingCards ${cardInfo.cardTitle}`}
                        id={cardInfo.cardTitle}
                        src={cardInfo.src} 
                        alt={`${cardInfo.cardTitle}`}
                    />                        
            )
        })                
    }     

    // Renderizar resultados :)
    const renderVotingResultsCards = () => {
        const getCardInfo = cardInput => cardsArray.find(card => card.cardTitle === cardInput)
        return roomData.votingCardsTurn.map((card, index) => {
            let cardInfo = getCardInfo(card)
            return(
                <div class='cardVoteResultsContainer'>
                    <Card 
                        key={index} 
                        class={`votedCards ${cardInfo.cardTitle}`}
                        id={cardInfo.cardTitle}
                        src={cardInfo.src} 
                        alt={`${cardInfo.cardTitle}`}
                    />            
                    <div class='cardVoteDetails'>
                        <div className='cardOwner'>
                            CARTA DO <span className='cardOwnerName'>pipo</span>
                        </div>
                        <div className='cardVoters'>
                            {
                                Math.random() > 0.5 ?
                                'NÃO ENGANA NINGUÉM'
                                : <div>
                                    OH QUEM VOTOU NESSA:
                                    <ul class='cardVotersList'>
                                        <li>pipo</li>
                                    </ul>
                                </div>
                            }
                        </div>
                        <div className='playerScoreAdded'>
                            {
                                Math.random() > 5 ?
                                'SEM PONTINHOS PRA VC'
                                : <div>
                                    <span className='playerScoreAddedAmount'>+3</span> PONTINHO(S) PRA VC
                                </div>
                            }
                        </div>
                    </div>            
                </div>
            )
        })                
    }                   

    return(
        <React.Fragment>
            { roomData.state === Constants.RoomStates.PICKING_PROMPT && amICurrentPlayer &&  <InputPrompt /> }
            <div className={ "dealer-table " } dixit-drop-zone="drop">
                { roomData.state == Constants.RoomStates.VOTING && renderVotingCards() }
                { roomData.state == Constants.RoomStates.SELECTING_CARDS && renderCardBack() }
            </div>
        </React.Fragment>
    )
}