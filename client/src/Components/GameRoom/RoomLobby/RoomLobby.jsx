import React, {useState, useEffect, useContext } from 'react'
import './RoomLobby.css'
import { socket } from '../../socket'
import { RoomContext } from '../GameRoom'

import StartButton from './StartButton/StartButton'
import DeckSelector from './DeckSelector/DeckSelector'
import VictorySelector from './VictorySelector/VictorySelector'

function RoomLobby (){
    console.log('renderizando Componente RoomLobby')
    const roomData = useContext(RoomContext)
    const [isStartButtonReady, setIsStartButtonReady] = useState(false)
    const [victoryConditions, setVictory] = useState("")
    console.log('victoryConditions', victoryConditions)

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
        if(roomData){
            return roomData.players.map((player, index) => {
                return(
                    <h2 key={index}>{player.name}</h2>
                )
            })             
        }
    }

    return (
        <div id="background-start-button">
            <div id="wrapper">
                {(socket.id === roomData.host.id && isStartButtonReady === true) 
                    ?   (<><div id="lobby-settings">
                                <DeckSelector />
                                <VictorySelector />
                           </div> 
                        </>)
                    : null
                }               
                { !isStartButtonReady 
                    ? <h1>Aguardando a galera...</h1> 
                    : <h1>Partida Pronta!</h1>
                }
                {renderIncommingPlayer()}
                {/* {(socket.id === roomData.host.id && isStartButtonReady === true)
                    ? <StartButton isDeckDixit={isDeckDixit} isDeckPeq={isDeckPeq} />
                    : null
                } */}
            </div>
        </div>
    )     
}

export default React.memo(RoomLobby)