import React, {useState, useEffect } from 'react'
import './RoomLobby.css'
import { socket } from '../../socket'

import StartButton from './StartButton/StartButton'

function RoomLobby (){
    const [players, setPlayer] = useState([])
    //const [playerCount, setPlayerCount] = useState(5)
    const [isStartButtonReady, setIsStartButtonReady] = useState(false)

    
    // FAZ APPEND DE UM JOGADOR QUE ENTROU NO LOBBY DA SALA,
    // QUANDO O CONTADOR OS 6 JOGADORES ENTRAREM, O BOTÃO DE START
    // FICA ATIVO!

    useEffect(() => {
        socket.on('getPlayersInfo', (players) => {
            console.log('RoomLobby = socket.on("gePlayersInfo") - Atualizando informação de jogadores')
            console.log(players)
            setPlayer(players)

        })

    }, [])
    useEffect(() => {
        // renderIncommingPlayer()
        // setPlayerCount(playerCount + 1)

        if (players.length >= 3){  
            setIsStartButtonReady(true)
        }

    }, [players])

    function renderIncommingPlayer(){
        return players.map((player, index) => {
            return(
                <h2 key={index}>{player.name}</h2>
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
                {/* <h2>{`${playerCount}/6`}</h2> */}
                {renderIncommingPlayer()}
                
            </div>
        </div>
    )     
}

export default RoomLobby