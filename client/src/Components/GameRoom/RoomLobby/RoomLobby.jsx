import React, {useState, useEffect, useContext } from 'react'
import './RoomLobby.css'
import { socket } from '../../socket'
import { RoomContext } from '../GameRoom'

import StartButton from './StartButton/StartButton'

function RoomLobby (){
    const roomData = useContext(RoomContext)
    const [isStartButtonReady, setIsStartButtonReady] = useState(false)

    useEffect(() => {
        if(roomData){
            if (roomData.players.length >= 2){  
                setIsStartButtonReady(true)
            }  
            else if (roomData.players.length < 2) {
                setIsStartButtonReady(false)
            }               
        }   
    }, [roomData])

    function renderIncommingPlayer(){
        console.log(roomData)
        if(roomData){
            return roomData.players.map((player, index) => {
                return(
                    <h2 key={index}>{player.name}</h2>
                )
            })             
        }
    }

    function renderStartButton(){
        if(roomData){
            if(socket.id === roomData.host.id && isStartButtonReady === true){
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