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


    const renderTurnResults = () =>{
        const getCardInfo = cardInput => cardsArray.find(card => card.cardTitle === cardInput)
        if(roomData.state == "PICKING_PROMPT" && roomData.turn > 1){
            console.log('Results', roomData.results)            
            let turnPlayerCard = getCardInfo(roomData.results[roomData.turn - 2].turnPlayerCard)

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
                            <div className="turnPrompt">"{roomData.results[roomData.turn - 2].turnPrompt}"<br />
                                         - {roomData.results[roomData.turn - 2].turnPlayer}
                            </div>
                            <div className="turnPlayerScore">10 pontos!</div>
                        </div>
                        <div className="otherPlayersResult">
                            <div>ADICIONAR LISTA DE QUEM VOTOU NA CARTA DO TURNPLAYER</div>
                            <div>ADICIONAR OS OUTROS RESULTADOS</div>
                            <div></div>
                            <button onClick={e => closeResults(e)}>Fechar On click hide TurnResults Component</button>
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