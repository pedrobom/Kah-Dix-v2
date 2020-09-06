import React, {useState, useEffect, useContext } from 'react'
import './EndScreen.css'
import { socket } from '../../socket'
import { RoomContext } from '../../GameRoom/GameRoom'

import StartButton from '../RoomLobby/StartButton/StartButton'
import DeckSelector from '../RoomLobby/DeckSelector/DeckSelector'
import VictorySelector from '../RoomLobby/VictorySelector/VictorySelector'

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

    const renderChampion = () => {
        return (
            <div className="championBox">
                <h1 className="champion-name">PLAYERNAME VITORIOSO</h1>
                <h2 className="champion-score">PLAYER SCORE</h2>
            </div>
        )
    }

    return (
        <>
        <div id="background-start-button">
            <div className="champion">{renderChampion()}</div> 
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
        </>

    )     
}

export default React.memo(EndScreen)