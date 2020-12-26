import React, { useContext } from 'react'
import './TurnResults.css'
import GameContext from '../GameContext/GameContext'
import AllCards from '../../allCards'
import Card from '../GameBoard/Card/Card'

function TurnResults (props){
    console.log('renderizando Componente TurnResults')
    const {roomData, setShouldShowTurnResults} = useContext(GameContext)
    const cardsArray = AllCards()

    const closeResults = e => {
        console.log("Fechando tela de resultados!")
        setShouldShowTurnResults(false)
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

        return turnResults.players
            .sort((a, b) => a.turnScore > b.turnScore ? -1 : 1)
            .map((player, index) => {
            if(player.name !== turnResults.turnPlayer) {
                let playerCard = getCardInfo(player.selectedCard)
                let votes = cardsVotes[player.selectedCard]
                return (
                    <div className="otherPlayerResult">
                            <div className='playerCardContainer'>
                                <img 
                                    className='resultCards'
                                    id={playerCard.cardTitle}
                                    src={playerCard.src} 
                                    alt={`Imagem da carta: ${playerCard.cardTitle}`}
                                />                                
                            </div>
                            <div className="playerName">Cartinha do <b>{player.name}</b></div>
                            <div className={"PlayerScore " + (player.turnScore > 0 ? 'positivo': ' ')}><b>{player.name}</b> fez {player.turnScore} {player.turnScore == 1 ? "pontinho!" : "pontos!"} </div>
                            <div className="VotedPlayers">
                                <div className="VotedPlayersTitle">
                                {!votes ? <>Não engana ninguém!</> : <>Batutinha(s) iludide(s):</>}
                                </div>
                                <ul>
                                     {votes && votes.map(player => {return <li key={player.name}>{player.name}</li>})}
                                </ul>
                            </div>
                        </div>  
              )  
            }
        })
    }

    const renderTurnResults = () => {
        let turnResults = roomData.results[roomData.turn - 2]
        let cardsVotes = {}

        turnResults.players.forEach(player => {
            if (!cardsVotes[player.votedCard]) {
                cardsVotes[player.votedCard] = []
            }
            cardsVotes[player.votedCard].push(player)
        })


        const getCardInfo = cardInput => cardsArray.find(card => card.cardTitle === cardInput)


        console.log('Results', roomData.results)
        let turnPlayerCard = getCardInfo(turnResults.turnPlayerCard)
        let votes = cardsVotes[turnResults.turnPlayerCard]

        console.log('votes on TurnPlayer', votes)
        return (
            <React.Fragment>
                <div className="background-results">
                    <button className="closeResultsButton" onClick={e => closeResults(e)}>Voltar para partida</button>
                    <div className="turnResultsBox">

                        <div className="turnPlayerResult">
                            <div className="turnCard">
                                <Card
                                    className={'resultCards'}
                                    id={turnPlayerCard.cardTitle}
                                    src={turnPlayerCard.src}
                                    alt={`Imagem da carta: ${turnPlayerCard.cardTitle}`}
                                />
                            </div>
                            <div className="resultDetails">
                                <div className="turnPrompt">"{turnResults.turnPrompt}"</div>
                                <div className="turnPlayer">
                                    Cartinha e frase do <b>{turnResults.turnPlayer}</b>
                                </div>
                                <div className={"turnPlayerScore " + (turnResults.turnPlayerScore > 0 ? 'positive' : '')}>

                                    Fez {turnResults.turnPlayerScore} {turnResults.turnPlayerScore == 1 ? 'ponto!' : 'pontos!'}</div>
                                <div className="turnPlayersVoters">
                                    {
                                        !votes
                                            ? 'Poetize incomprendide! :('
                                            : (
                                                <>
                                                    <div className='turnPlayerVotersTitle'>Batutinhas que sacaram:</div>
                                                    <ul>{votes.map(player => <li key={player.name}>{player.name}</li>)}</ul>
                                                </>
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="secondBox" >
                            <div className="otherPlayerResultsContainer">
                                {renderOtherPlayersResults()}
                            </div>

                        </div>



                    </div>
                </div>
            </React.Fragment>

        )


    }
    return (
        <>
        {renderTurnResults()}
        </>
    )     
}

export default React.memo(TurnResults)