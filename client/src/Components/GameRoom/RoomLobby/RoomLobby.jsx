import React, {useState, useEffect } from 'react'
import './RoomLobby.css'
import { socket } from '../../socket'

import StartButton from './StartButton/StartButton'

function RoomLobby (roomData){

    const [isStartButtonReady, setIsStartButtonReady] = useState(false)


    
    useEffect(() => {
        if(roomData.roomData){
            if (roomData.roomData.players.length >= 2){  
                setIsStartButtonReady(true)
            }                 
        }   
    }, [roomData])

    function renderIncommingPlayer(){
        console.log(roomData)
        if(roomData.roomData){
            return roomData.roomData.players.map((player, index) => {
                return(
                    <h2 key={index}>{player.name}</h2>
                )
            })             
        }
    }
  
    function startGame(e) {
        e.preventDefault();
        socket.emit('gameStart');       
    }

    function renderStartButton(){
        if(roomData && roomData.Host){
            if(socket.id == roomData.Host.id && isStartButtonReady == true){
                    return(
                    <StartButton /> 
                    )            
            }

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