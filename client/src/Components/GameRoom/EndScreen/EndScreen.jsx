import React, {useState, useEffect, useContext } from 'react'
import './EndScreen.css'
import { socket } from '../../socket'
import { RoomContext } from '../GameRoom'

import StartButton from '../RoomLobby/StartButton/StartButton'

function EndScreen (){
    console.log('renderizando Componente EndScreen')
    const roomData = useContext(RoomContext)
    const [isStartButtonReady, setIsStartButtonReady] = useState(false)

    useEffect(() => {
        if(roomData){
            if (roomData.players.length >= 3){  
                setIsStartButtonReady(true)
            }  
            else if (roomData.players.length < 3) {
                setIsStartButtonReady(false)
            }               
        }   
    }, [roomData])

    function renderIncommingPlayer(){
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

    const renderChampion = () => {
        return (
            <div className="championBox">

            </div>
        )
    }

    return (
        <React.Fragment>
            <div>
            </div>
            <div id="background-start-button">
            <div className="champion">{renderChampion()}</div> 
                <div id="wrapper">
                    {renderStartButton()}                
                    { !isStartButtonReady 
                        ? <h1>Aguardando a galera...</h1> 
                        : <h1>Bora jogar mais uma!</h1>
                    }
                    {renderIncommingPlayer()}
                </div>
            </div>            
        </React.Fragment>

    )     
}

export default React.memo(EndScreen)