import React, { useContext } from 'react'
import './TurnResults.css'
import { RoomContext } from '../GameRoom'
import AllCards from '../../allCards'
import Card from '../Card/Card'

function TurnResults (){
    console.log('renderizando Componente TurnResults')
    const roomData = useContext(RoomContext)
    const cardsArray = AllCards()

    const closeResults = e => {
        e.preventDefault()
        const resultsContainer = document.querySelector('.background-results')
        resultsContainer.classList.toggle('results-hide')
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
                            <div className="playerName">Cartinha do {player.name}</div>
                            <div className="PlayerScore">{player.turnScore} {player.turnScore == 1 ? "pontinho!" : "pontos!"} </div>
                            <div className="VotedPlayers">
                                <ul>
                                    {!votes ? 'Não engana ninguém!' : votes.map(player => {return <li>{player.name}</li>})}
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
                            <div className="turnPlayersVoters">Votos: <br/>{!votes ? 'Um poeta incompreendido!' : votes.map(player => {return <li>{player.name}</li>})}</div>
            <div className="turnPlayerScore">{turnResults.turnPlayerScore} {turnResults.turnPlayerScore == 1 ? 'ponto!' : 'pontos!'}</div>
                        </div>
                        <div className="otherPlayerResultsContainer">
                            {renderOtherPlayersResults()} 
                        </div>    
                            <button className="closeResultsButton" onClick={e => closeResults(e)}>Fechar</button>
                        
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