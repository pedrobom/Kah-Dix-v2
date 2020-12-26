import React, { useMemo, useState, useEffect, useContext } from "react";

import './GameBoardHeader.css'
import Constants from "../../../../Constants"
import GameContext from '../../GameContext/GameContext'

// Esse é um componente que representa a área jogável do jogo (e.g., escolher carta, votar, etc)
export default () => {   

    const { roomData, amICurrentPlayer, myPlayer, currentPlayer } = useContext(GameContext)

    // Define o que os jogadores devem ver como "estado atual do jogo" (e.g. "Escolheno as cartinha")
    var gameStateHeader = ''
    var gameStateClass = ''

    console.debug("Renderizando GameBoardHeader! RoomData:, ", roomData, " Jogador da sessao, ", myPlayer, ", jogador atual:", currentPlayer)

    switch(roomData.state) {

        // Escolhendo cartas
        case Constants.RoomStates.SELECTING_CARDS:
            gameStateClass = 'selectingCards'
            gameStateClass += ' iAmDone'
            // Já escolheu o carta ou nao esscolho essa!
            if (myPlayer.selectedCard) {
                gameStateHeader = 'Esperano o/as amiguinho/a </b>escolher as cartinha</b>'
            } 
            // Eu to escolhendo a carta!
            else {
                gameStateHeader = 'Tá na hora de vc <b>escolher a cartinha</b> pra essa frase aí :)'
            }
            break;

        // Votano!
        case Constants.RoomStates.VOTING:
            gameStateClass = 'votingCards'

            // Já votei a carta ou não voto essa rodada
            if (amICurrentPlayer || myPlayer.votedCard) {
                gameStateHeader = 'Esperano o/as amiguinho/a <b>votar nas cartinha</b>'
                gameStateClass += ' iAmDone'
            } 
            // Eu to votando a carta!
            else {
                gameStateHeader = 'Tá na hora de vc <b>votar na cartinha</b> pra essa frase aí :)'
            }
            break;


        // Escolhendo frase!
        case Constants.RoomStates.PICKING_PROMPT:
            gameStateClass = 'pickingPrompt'

            // Não sou eu quem escolhe!
            if (!amICurrentPlayer) {
                gameStateHeader = `<b>${currentPlayer.name}</b> tá matutando aquele bordão solerte`
            } 
            // Escolhendo a frase!
            else {
                gameStateHeader = 'Tá na <b>hora de vc escolher</b> sua frase! :)'
            }
            break;

    }

    console.debug("Rendering GameBoard header.. frase [%s] and class [%s]", gameStateHeader, gameStateClass)    

    return (
        <div className={ "gameBoardHeader " + gameStateClass }>
            {/* Header state */}
            <div className="gameStateHeader" dangerouslySetInnerHTML={{ __html: gameStateHeader }}>
            </div>
            {
            /* Prompt selecionado :) */
            roomData.prompt &&
                <div className='gamePrompt'>
                    <div className='promptUserName'>
                        <span className='userName'>{currentPlayer.name}</span> diz:
                    </div>
                    <div className='promptText'>
                        {roomData.prompt}
                    </div>
                </div>
            }
        </div>
    )        


}
