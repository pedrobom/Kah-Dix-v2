import React, {useMemo, useEffect, useState, useContext } from 'react'
import './Table.css'
import { socket } from '../../../socket'
import{ RoomContext } from '../../GameRoom'
import InputPrompt from '../InputPrompt/InputPrompt'
import AllCards from '../../../allCards'
import cardBackSrc from '../../../../assets/images/cardBack'
import Card from '../Card/Card'
import Constants from '../../../../Constants'
import SessionContext from '../../../SessionContext'
import {useDrop} from 'react-dnd'

export default function Table() {
    
    const roomData = useContext(RoomContext)
    const {session} = useContext(SessionContext)
    const cardsArray = AllCards()

    // Configuraçoes de dragn and drop :)
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: Constants.DragTypes.PICKING_CARD,
        drop: (card) => selectCard(card),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    var myPlayer = useMemo(() => roomData.players.find((player) => player.id == session.user.id))
    var currentPlayer = useMemo(() => roomData.players[roomData.currentPlayerIndex])
    var amICurrentPlayer = useMemo(() => currentPlayer.id == myPlayer.id)

    // Seleciona uma carta :)
    const selectCard = (card) => {
        console.log("Cartã [%o] sendo selecionada", card)
        socket.emit('selectCard', card.id, (error) => {
            if(error) {
                alert(error);
            }
        });
    }

    // Devemos mostrar os resultados! (Acabaram de votar agora)
    function shouldShowVoteResults() {
        return roomData.state == Constants.RoomStates.PICKING_PROMPT && roomData.turn > 1
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
                        class={`votingCards card-${cardInfo.cardTitle}`}
                        id={cardInfo.cardTitle}
                        src={cardInfo.src} 
                        alt={`${cardInfo.cardTitle}`}
                        onSelect={() => {
                            let cardId = cardInfo.cardTitle
                            console.log('Carta selecionada [%s]', cardId)
                            if (roomData.state === Constants.RoomStates.VOTING) {
                                console.log('Jogador tentou votar na carta: ', cardId)

                                socket.emit('voteCard', cardId, (error) => {
                                    if (error) {
                                        return alert(error)
                                    }
                                    else {
                                        let ele = document.querySelector(`.card-${cardId}`)
                                        if (ele !== null)
                                            ele.classList.add("votedCard")
                                    }
                                })


                            }

                        }}
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
            <div className={"dealer-table " 
                + (isOver ? "is-drag-over ":"")
                + (canDrop ? "drag-can-drop ":"")}
                 dixit-drop-zone="drop" ref={drop}>
                { roomData.state == Constants.RoomStates.VOTING && renderVotingCards() }
                { roomData.state == Constants.RoomStates.SELECTING_CARDS && renderCardBack() }
            </div>
        </React.Fragment>
    )
}