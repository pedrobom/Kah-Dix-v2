import React, {useState, useEffect, useContext } from 'react'
import './EndScreen.css'
import { socket } from '../../socket'
import GameContext from '../../GameRoom/GameContext/GameContext'
import SessionContext from '../../SessionContext'

import StartButton from '../RoomLobby/StartButton/StartButton'
import DeckSelector from '../RoomLobby/DeckSelector/DeckSelector'
import VictorySelector from '../RoomLobby/VictorySelector/VictorySelector'
import loadingImg from '../../../assets/images/loadingImg'
import snadesImg from '../../../assets/images/snades'

function EndScreen (){
    console.log('renderizando Componente EndScreen')
    const {roomData} = useContext(GameContext)
    const [isStartButtonReady, setIsStartButtonReady] = useState(false)
    const [isDeckPeq, setDeckPeq] = useState(false)
    const [isDeckDixit, setDeckDixit] = useState(false)
    const [isDeckNude, setDeckNude] = useState(false)
    const [isDeckEuro, setDeckEuro] = useState(false)
    const [victoryConditions, setVictory] = useState("")
    const { session, setSession } = useContext(SessionContext)


    useEffect(() => {
            if (roomData.players.length >= 3){  
                setIsStartButtonReady(true)
            }  
            else if (roomData.players.length < 3) {
                setIsStartButtonReady(false)
            }                 
    }, [])

    function renderIncommingPlayer(){
        if(roomData){
            return roomData.players.map((player, index) => {
                return(
                    <h2 key={index}>{player.name} ({player.score} pontos)</h2>
                )
            })             
        }
    }

    const renderChampion = () => {
        if(roomData.winner !== [])
        return roomData.winner.map(player => {
            return (
                <div className="championBox">
                    <img id="snades" src={snadesImg} alt="snades"/>           
                    <div class="wordart rainbow"><span class="text">PARABÉNS!</span></div>
                    <div class="wordart2 superhero"><span class="text">{player.name}</span></div> 
                    <div class="wordart3 tilt"><span class="text">Fez {player.score} pontos!</span></div>    
                    <img id="jonas" src={loadingImg} alt="Jonas"/>           
                </div>
            )            
        })
    }

    const quitRoom = () => {
        socket.emit('quitRoom', (quit) => {
            if(quit){
            alert(quit)
            window.location.replace("/");
            return false;
            } 
        })
    }
    return (
        <>
        <div id="background-start-button">
            <div id="wrapper">


                {(roomData.winner) 
                ? 

                <div className="champion">{renderChampion()}</div>

                
                : null }

                {(session.user.id === roomData.host.id) 
                    ? (<>
                    <div id="lobby-settings">
                    <div id="build-deck">
                    <h2>Monte o seu Baralho!</h2>
                    <div className="deck-input">
                    <input
                    name="Deck do Peq"
                    type="checkbox"
                    onChange={(e) => {
                        let checked=e.target.checked;
                        setDeckPeq(checked)
                    }}/>
                    <h3>Cartas do Peq</h3>
                    </div>
                    <div className="deck-input">
                    <input
                    name="Deck de Nude"
                    type="checkbox"
                    onChange={(e) => {
                        let checked=e.target.checked;
                        setDeckNude(checked)
                    }}/>
                    <h3>Cartas de Nudes</h3>
                    </div>
                    <div className="deck-input">
                    <input
                    name="Deck de Euro"
                    type="checkbox"
                    onChange={(e) => {
                        let checked=e.target.checked;
                        setDeckEuro(checked)
                    }}/>
                    <h3>Cartas de Museus Europeus</h3>
                    </div>
                    <div className="deck-input"><input
                    name="Deck de Dixit"
                    type="checkbox"
                    onChange={(e) => {
                        let checked=e.target.checked;
                        setDeckDixit(checked)
                    }}/><h3>Cartas de Dixit</h3></div> 
                    </div>                       
                    <div id="victory-conditions">
                    <h2>Condições de vitória</h2>
                    <div className="victory-input">
                    <input
                    name="victory"
                    type="radio"
                    value="points-victory"
                    onChange={(e) => {
                        if(e.target.checked){
                        const value = e.target.value
                        setVictory(value)                                
                        }

                    }}/><h3>Corrida dos 30 pontos</h3></div>
                    <div className="victory-input">
                    <input
                    name="victory"
                    type="radio"
                    value="deck-victory"
                    onChange={(e) => {
                        if(e.target.checked){
                            const value = e.target.value
                            setVictory(value)                                
                            }

                    }}/><h3>Jogar até o baralho acabar</h3></div>
                    </div>
                </div>
                </>) 
                : null}             
                { !isStartButtonReady 
                    ? <h1>Aguardando a galera...</h1> 
                    : <h1>Bora jogar mais uma!</h1>
                }
                {renderIncommingPlayer()}
                {/* {(session.user.id === roomData.host.id && isStartButtonReady === true)
                    ? <StartButton isDeckDixit={isDeckDixit} isDeckPeq={isDeckPeq} />
                    : null
                } */}
                {
                (session.user.id === roomData.host.id && isStartButtonReady === true)
                && (isDeckDixit || isDeckPeq || isDeckEuro || isDeckNude) 
                && (victoryConditions !== "") 
                ? <StartButton isDeckDixit={isDeckDixit} isDeckPeq={isDeckPeq} isDeckEuro={isDeckEuro} isDeckNude={isDeckNude} victoryConditions={victoryConditions} /> 
                : null
                }
                <div className="leave-lobby" onClick={(e) => quitRoom(e)}><a>Sair da Sala</a></div>             
            </div>
        </div>           
        </>

    )     
}

export default React.memo(EndScreen)