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
        const resultsContainer = document.querySelector('.background-results-button')
        resultsContainer.classList.toggle('.results-hide')
    }


    const renderTurnResults = () =>{
        const getCardInfo = cardInput => cardsArray.find(card => card.cardTitle === cardInput)
        if(roomData.state == "PICKING_PROMPT" && roomData.turn > 1){
            console.log('Results', roomData.results)            
            let turnPlayerCard = getCardInfo(roomData.results[roomData.turn - 2].turnPlayerCard)

            if (roomData.state == "PICKING_PROMPT" && roomData.turn > 1)
            return (
                <div className="background-results-button">
                    <div className="turnResultsBox">
                        <div id="wrapper">
                            <Card 
                                class={'resultCards'}
                                id={turnPlayerCard.cardTitle}
                                src={turnPlayerCard.src} 
                                alt={`Imagem da carta: ${turnPlayerCard.cardTitle}`}
                            />
                            <div>"{roomData.results[roomData.turn - 2].turnPrompt}"</div>
                            <div>- {roomData.results[roomData.turn - 2].turnPlayer}</div>
                            <div>ADICIONAR LISTA DE QUEM VOTOU NA CARTA DO TURNPLAYER</div>
                            <div>ADICIONAR OS OUTROS RESULTADOS</div>
                            <div></div>
                            <button onClick={e => closeResults(e)}>Fechar On click hide TurnResults Component</button>
                        </div>
                    </div>
                </div>
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