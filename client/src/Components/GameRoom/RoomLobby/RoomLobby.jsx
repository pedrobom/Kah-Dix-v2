import React, {useState, useEffect } from 'react'
import './RoomLobby.css'
import { socket } from '../../socket'

import StartButton from './StartButton/StartButton'

function RoomLobby (){
    const [roomData, setRoom] = useState()
    //const [playerCount, setPlayerCount] = useState(5)
    const [isStartButtonReady, setIsStartButtonReady] = useState(false)
    const [isHost, setIsHost] = useState(false)

    
    // FAZ APPEND DE UM JOGADOR QUE ENTROU NO LOBBY DA SALA,
    // QUANDO O CONTADOR OS 6 JOGADORES ENTRAREM, O BOTÃO DE START
    // FICA ATIVO!

        useEffect(() => {
            socket.on('roomData', (roomData) => {
                console.log('RoomLobby = Recebendo atualização RoomData do server')
                console.log("socket.on('roomData') = [%s]", roomData)
                setRoom(roomData)
            })

        }, [])

        useEffect(() => {
        socket.on('isHost', (isBoolean) => {
            console.log('RoomLobby = socket.on("isHost") - Perguntando ao server se sou o Host')
            setIsHost(isBoolean)
        })

    }, [])
    
    useEffect(() => {
        // renderIncommingPlayer()
        // setPlayerCount(playerCount + 1)
        if(roomData){
            if (roomData.players.length >= 2){  
                setIsStartButtonReady(true)
            }                 
        }
       
    }, [])

    function renderIncommingPlayer(){
        if(roomData)
        return roomData.players.map((player, index) => {
            return(
                <h2 key={index}>{player.name}</h2>
            )
        })
    }

    
    function startGame(e) {
        e.preventDefault();
        socket.emit('gameStart');       
    }

    function renderStartButton(){
        if(isHost == true && isStartButtonReady == true){
            console.log('Eu sou o Host? [%s]',isHost)
                return(
                <StartButton /> 
                )            
        }

    }

    return (
        <div id="background-start-button">
            <div id="wrapper">
                
                {renderStartButton()}                
                { !isStartButtonReady 
                    ? <h1>Aguardando a galera...</h1> 
                    : <h1>Partida Pronta!</h1>
                }
                {/* <h2>{`${playerCount}/6`}</h2> */}
                {renderIncommingPlayer()}
                
            </div>
        </div>
    )     
}

export default RoomLobby