import React, {useMemo, useEffect, useState, useContext } from 'react'
import './Table.css'
import { socket } from '../../../socket'
import InputPrompt from '../InputPrompt/InputPrompt'
import AllCards from '../../../allCards'
import cardBackSrc from '../../../../assets/images/cardBack'
import Card from '../Card/Card'
import Constants from '../../../../Constants'
import SessionContext from '../../../SessionContext'

import GameContext from '../../GameContext/GameContext'
import {useDrop} from 'react-dnd'

export default function Table() {
    
    const [PreVotedCard, setPreVotedCard] = useState(null)
    const {session} = useContext(SessionContext)
    const cardsArray = AllCards()
    const { roomData, amICurrentPlayer, myPlayer, currentPlayer , myVotedCard} = useContext(GameContext)

    // Configuraçoes de dragn and drop :)
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: Constants.DragTypes.PICKING_CARD,
        drop: (card) => selectCard(card),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    // Seleciona uma carta e coloca na mesa :)
    const selectCard = (card) => {
        console.log("Cartã [%o] sendo selecionada", card)
        socket.emit('selectCard', card.id, (error) => {
            if(error) {
                alert(error);
            }
        });
    }


    const handleOutsideClick = (e) => {
        if (e.defaultPrevented) return
        console.log("Clicked DOC")
        setPreVotedCard(null);
        return true
    }

    // Quando há um clique fora da carta.. vamos cancelar o "preview" :)
    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => {
          document.removeEventListener("click", handleOutsideClick);
        };
      }, []);

    // Quando há um clique em uma carta na mesa :)
    const cardClick = (cardId) => {
        console.log("Carta da mesa clicada: [%s]", cardId)
        if (roomData.state == Constants.RoomStates.VOTING) {
            if (isCardPreVoted(cardId)) {
                console.log("Carta já está pre-votada, então vamos finalizar o voto! :)")
                if (myVotedCard) {
                    console.log("Jogador já votou, vamos ignorar isso :)")
                    alert("Você já votou! Agora espere os outros acabarem de votar :)")
                    return
                }
                voteCard(cardId)
            } else {
                console.log("Pre-votando na carta [%s]", cardId)
                setPreVotedCard(cardId)
            }
        }

    }

    // Vota em uma carta da mesa :)
    const voteCard = (cardId) => {
        console.log('Jogador votando na carta [%s]', cardId)
        socket.emit('voteCard', cardId, (error) => {
            if (error) {
                return alert(error)
            }
            else {
                setPreVotedCard(null)
                let ele = document.querySelector(`.card-${cardId}`)
                if (ele !== null)
                    ele.classList.add("votedCard")
            }
        })
    }

    // Antes de escolher uma carta de fato, o usuário
    // vai selecionar ela para "preview"
    const isCardPreVoted = (cardId)  => {
        return PreVotedCard == cardId
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
            var cardId = cardInfo.cardTitle
            return(
                    <Card 
                        key={index} 
                        class={`votingCards card-${cardId} ` 
                            + (isCardPreVoted(cardId) ? 'pre-voted ' : '')
                            + (myVotedCard == cardId ? 'votedCard' : '')
                            }
                        id={cardId}
                        src={cardInfo.src} 
                        alt={`${cardId}`}
                        isPreVoted={isCardPreVoted(cardId)}
                        onClick={cardClick}
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