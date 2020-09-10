import React, {useState, useEffect, useContext } from 'react'
import './RoomLobby.css'
import { socket } from '../../socket'
import { RoomContext } from '../GameRoom'
import StartButton from './StartButton/StartButton'
import SessionContext from "../../SessionContext"

function RoomLobby (){
    console.log('renderizando Componente RoomLobby')
    const roomData = useContext(RoomContext)
    const [isStartButtonReady, setIsStartButtonReady] = useState(false)
    const [isDeckPeq, setDeckPeq] = useState(false)
    const [isDeckDixit, setDeckDixit] = useState(false)
    const [isDeckNude, setDeckNude] = useState(false)
    const [isDeckEuro, setDeckEuro] = useState(false)
    const [victoryConditions, setVictory] = useState("")

    const { session, setSession } = useContext(SessionContext)

    console.log('isDeckDixit', isDeckDixit)
    console.log('isDeckPeq', isDeckPeq)
    console.log('victoryConditions', victoryConditions)
    console.log('socket content', socket)


    useEffect(() => {
            if (roomData.players.length >= 2){  
                setIsStartButtonReady(true)
            }  
            else if (roomData.players.length < 2) {
                setIsStartButtonReady(false)
            }
    }, [roomData])

    function renderIncommingPlayer(){
            return roomData.players.map((player, index) => {
                if(roomData.host.name == player.name) return (<h2 key={index}>{player.name} (Líder da presepada)</h2>)
                return(
                    <h2 key={index}>{player.name}</h2>
                )
            })             
    }
    const quitRoom = () => {
        socket.emit('quitRoom', (quit) => {
            if(quit){
            alert(quit)
            window.location.reload()
            return false;
            } 
        })
    }
    return (
        <div id="background-start-button">
            <div id="wrapper">

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
                    : <h1>Partida Pronta!</h1>
                }
                    {renderIncommingPlayer()}
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
    )     
}

export default React.memo(RoomLobby)