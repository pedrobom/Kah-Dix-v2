import React, {useState, useEffect, useContext } from 'react'
import './RoomLobby.css'
import { socket } from '../../socket'
import { RoomContext } from '../GameRoom'

import StartButton from './StartButton/StartButton'

function RoomLobby (){
    console.log('renderizando Componente RoomLobby')
    const roomData = useContext(RoomContext)
    const [isStartButtonReady, setIsStartButtonReady] = useState(false)
    const [isDeckPeq, setDeckPeq] = useState(false)
    const [isDeckDixit, setDeckDixit] = useState(false)
    const [victoryConditions, setVictory] = useState("")
    console.log('isDeckDixit', isDeckDixit)
    console.log('isDeckPeq', isDeckPeq)
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

    function renderStartButton(){
        if(roomData){
            if(socket.id === roomData.host.id && isStartButtonReady === true){
                return(
                <StartButton isDeckDixit={isDeckDixit} isDeckPeq={isDeckPeq} /> 
                )
                        
            }
            console.log("isDeckDixit at StartComponent RenderStartButton",isDeckDixit)    
        }            
    }

    return (
        <div id="background-start-button">
            <div id="wrapper">
                <div id="lobby-settings">
                    <div id="build-deck">
                        <h2>Monte o seu Baralho!</h2>
                        {(socket.id === roomData.host.id) ? (<><div className="deck-input"><input
                        name="Deck do Peq"
                        type="checkbox"
                        onChange={(e) => {
                            let checked=e.target.checked;
                            setDeckPeq(checked)
                        }}/><h3>Cartas do Peq</h3></div></>) : null}
                        {(socket.id === roomData.host.id) ? (<><div className="deck-input"><input
                        name="Deck de Dixit"
                        type="checkbox"
                        onChange={(e) => {
                            let checked=e.target.checked;
                            setDeckDixit(checked)
                        }}/><h3>Cartas de Dixit</h3></div></>) : null}
                    </div>
                    <div id="victory-conditions">
                        <h2>Condições de vitória</h2>
                        {(socket.id === roomData.host.id) ? (<><div className="victory-input">
                        <input
                        name="victory"
                        type="radio"
                        value="points-victory"
                        onChange={(e) => {
                            if(e.target.checked){
                            const value = e.target.value
                            setVictory(value)                                
                            }

                        }}/><h3>Corrida dos 30 pontos</h3></div></>) : null}
                        {(socket.id === roomData.host.id) ? (<><div className="victory-input">
                        <input
                        name="victory"
                        type="radio"
                        value="deck-victory"
                        onChange={(e) => {
                            if(e.target.checked){
                                const value = e.target.value
                                setVictory(value)                                
                                }
    
                        }}/><h3>Jogar até o baralho acabar</h3></div></>) : null}
                    </div>
                </div>                
                { !isStartButtonReady 
                    ? <h1>Aguardando a galera...</h1> 
                    : <h1>Partida Pronta!</h1>
                }
                {renderIncommingPlayer()}
                {(socket.id === roomData.host.id && isStartButtonReady === true) ? <StartButton isDeckDixit={isDeckDixit} isDeckPeq={isDeckPeq} /> : null}
            </div>
        </div>
    )     
}

export default React.memo(RoomLobby)