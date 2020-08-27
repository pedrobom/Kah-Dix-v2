import React, {useState, useEffect } from 'react'
import './RoomLobby.css'
import { socket } from '../../socket'

import StartButton from './StartButton/StartButton'

function RoomLobby (){
    const [incomingPlayer, setIncomingPlayer] = useState(['player1(host)', 'player2'])
    const [playerCount, setPlayerCount] = useState(5)
    const [isStartButtonReady, setIsStartButtonReady] = useState(false)

    
    // FAZ APPEND DE UM JOGADOR QUE ENTROU NO LOBBY DA SALA,
    // QUANDO O CONTADOR OS 6 JOGADORES ENTRAREM, O BOTÃO DE START
    // FICA ATIVO!
    useEffect(() => {
        renderIncommingPlayer()
        setPlayerCount(playerCount + 1)

        if (playerCount >= 5){  
            setIsStartButtonReady(true)
        }

    }, [incomingPlayer])

    function renderIncommingPlayer(){
        return incomingPlayer.map((player, index) => {
            return(
                <h2 key={index}>{player}</h2>
            )
        })
    }

    
    function startGame(e) {
        e.preventDefault();
        socket.emit('gameStart');       
    }

    return (
        <div id="background-start-button">
            <div id="wrapper">
                
                { isStartButtonReady && <StartButton /> }
                
                { !isStartButtonReady 
                    ? <h1>Esperando demais Jogadores:</h1> 
                    : <h1>Partida Pronta!</h1>
                }
                <h2>{`${playerCount}/6`}</h2>
                {renderIncommingPlayer()}
                
            </div>
        </div>
    )     
}

export default RoomLobby