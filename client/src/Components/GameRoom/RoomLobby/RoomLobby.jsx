import React, {useState, useEffect } from 'react'
import './RoomLobby.css'
import { socket } from '../../socket'

import StartButton from './StartButton/StartButton'

function RoomLobby ({roomData}){

    const [isStartButtonReady, setIsStartButtonReady] = useState(false)

    useEffect(() => {
        if(roomData){
            if (roomData.players.length >= 2){  
                setIsStartButtonReady(true)
            }                 
        }   
    }, [roomData])

    function renderIncommingPlayer(){
        console.log(roomData)
        if(roomData){
            return roomData.players.map((player, index) => {
                return(
                    <h2 key={index}>{player.user.name}</h2>
                )
            })             
        }
    }

    function renderStartButton(){
        if(roomData){
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
                {renderIncommingPlayer()}
                
            </div>
        </div>
    )     
}

export default RoomLobby