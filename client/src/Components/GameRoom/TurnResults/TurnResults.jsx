import React, { useContext } from 'react'
import './TurnResults.css'
import { RoomContext } from '../GameRoom'
import AllCards from '../../allCards'
import Card from '../GameBoard/Card/Card'

function TurnResults (){
    console.log('renderizando Componente TurnResults')
    const roomData = useContext(RoomContext)
    const cardsArray = AllCards()

    const closeResults = e => {
        e.preventDefault()
        const resultsContainer = document.querySelector('.background-results')
        resultsContainer.classList.add('results-hide')
    }

    const renderOtherPlayersResults = () =>{
        const getCardInfo = cardInput => cardsArray.find(card => card.cardTitle === cardInput)
        let turnResults = roomData.results[roomData.turn -2]
        let cardsVotes = {}

        turnResults.players.forEach(player => {
            if(!cardsVotes[player.votedCard]) {
                cardsVotes[player.votedCard] = []
            }
            cardsVotes[player.votedCard].push(player)
        })

        return turnResults.players.map((player, index) => {
            if(player.name !== turnResults.turnPlayer) {
                let playerCard = getCardInfo(player.selectedCard)
                let votes = cardsVotes[player.selectedCard]
                return (
                    <div className="otherPlayerResult">
                            <img 
                                className='resultCards'
                                id={playerCard.cardTitle}
                                src={playerCard.src} 
                                alt={`Imagem da carta: ${playerCard.cardTitle}`}
                            />                                
                            <div className="playerName">Cartinha do <b>{player.name}</b></div>
                            <div className="PlayerScore"><b>{player.name}</b> fez {player.turnScore} {player.turnScore == 1 ? "pontinho!" : "pontos!"} </div>
                            <div className="VotedPlayers">
                                <ul>
                                    {!votes ? 'Não engana ninguém!' : (<>Batutinha(s) iludide(s): <br />{votes.map(player => {return <li>{player.name}</li>})}</>)}
                                </ul>
                            </div>
                        </div>  
              )  
            }
        })
    }

    const renderTurnResults = () =>{
        let turnResults = roomData.results[roomData.turn -2]        
        let cardsVotes = {}

        turnResults.players.forEach(player => {
            if(!cardsVotes[player.votedCard]) {
                cardsVotes[player.votedCard] = []
            }
            cardsVotes[player.votedCard].push(player)
        })


        const getCardInfo = cardInput => cardsArray.find(card => card.cardTitle === cardInput)
        if(roomData.state == "PICKING_PROMPT" && roomData.turn > 1){
            console.log('Results', roomData.results)            
            let turnPlayerCard = getCardInfo(turnResults.turnPlayerCard)
            let votes = cardsVotes[turnResults.turnPlayerCard]
            console.log('votes on TurnPlayer', votes)
            if (roomData.state == "PICKING_PROMPT" && roomData.turn > 1)
            return (
                <React.Fragment>
                <div className="background-results">
                    <div className="turnResultsBox">
                        <div className="turnPlayerResult">
                            <div className="card">
                            <Card 
                                class={'resultCards'}
                                id={turnPlayerCard.cardTitle}
                                src={turnPlayerCard.src} 
                                alt={`Imagem da carta: ${turnPlayerCard.cardTitle}`}
                            />                                
                            </div>
                            <div className="turnPrompt">"{turnResults.turnPrompt}"<br />
                            - {turnResults.turnPlayer}
                            </div>
                            <div className="turnPlayersVoters">
                                {
                                    !votes 
                                        ? 'Poetize incomprendide! :(' 
                                        : (
                                            <>
                                            <h3>Batutinhas que sacaram:</h3>   
                                            <ul>{votes.map(player => <li>{player.name}</li>)}</ul>
                                            </>
                                            )                                      
                                }  
                            </div>
                            <div className="turnPlayerScore">{turnResults.turnPlayerScore} {turnResults.turnPlayerScore == 1 ? 'ponto!' : 'pontos!'}</div>
                        </div>
                        <div className="secondBox" >
                            <div className="otherPlayerResultsContainer">
                                {renderOtherPlayersResults()}    
                            </div> 
                            <button className="closeResultsButton" onClick={e => closeResults(e)}>Voltar para partida</button>                           
                        </div>

                            
                        
                    </div>
                </div>
                </React.Fragment>
                
            )                
        }
        
    }
    return (
        <>
        {renderTurnResults()}
        </>
    )     
}

export default React.memo(TurnResults)