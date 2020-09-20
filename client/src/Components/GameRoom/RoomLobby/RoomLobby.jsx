import React, { useState, useEffect, useContext } from 'react'
import './RoomLobby.css'
import { socket } from '../../socket'
import { RoomContext } from '../GameRoom'
import StartButton from './StartButton/StartButton'
import SessionContext from "../../SessionContext"
import { Redirect } from 'react-router'

function RoomLobby() {
    console.log('renderizando Componente RoomLobby')
    const roomData = useContext(RoomContext)
    const [isStartButtonReady, setIsStartButtonReady] = useState(false)
    const [isDeckPeq, setDeckPeq] = useState(roomData.isDeckPeq)
    const [isDeckDixit, setDeckDixit] = useState(roomData.isDeckDixit)
    const [isDeckNude, setDeckNude] = useState(roomData.isDeckNude)
    const [isDeckEuro, setDeckEuro] = useState(roomData.isDeckEuro)
    const [victoryConditions, setVictory] = useState(roomData.victory)
    const [numberOfCards, setnumberOfCards] = useState(0)
    const { session, setSession } = useContext(SessionContext)

    useEffect(() => {
        let totalCards = 0
        if(session.user.id === roomData.host.id){
            changeDeck()
            
        }    
            if (isDeckDixit == true) totalCards += 257
            if (isDeckEuro == true) totalCards += 35
            if (isDeckPeq == true) totalCards += 21
            if (isDeckNude == true) totalCards += 70
            setnumberOfCards(totalCards)
            if(totalCards >= 50) document.querySelector('.total-cartas').classList.add('total-ready')
            if(totalCards < 50) document.querySelector('.total-cartas').classList.remove('total-ready')

            
    }, [isDeckDixit, isDeckEuro, isDeckNude, isDeckPeq])

    useEffect(() => {
        if(session.user.id === roomData.host.id)
            socket.emit('victoryChange', victoryConditions)
    }, [victoryConditions])

    useEffect(() => {
            if (roomData.players.length >= 3){  
                setIsStartButtonReady(true)
            }  
            else if (roomData.players.length < 3) {
                setIsStartButtonReady(false)
            }
            setDeckDixit(roomData.isDeckDixit)
            setDeckPeq(roomData.isDeckPeq)
            setDeckEuro(roomData.isDeckEuro)
            setDeckNude(roomData.isDeckNude)
            setVictory(roomData.victory)

    }, [roomData])

    function renderIncommingPlayer() {
        return roomData.players.map((player, index) => {
            if (roomData.host.name == player.name) return (<h2 key={index}>{player.name} (Líder da presepada)</h2>)
            return (
                <h2 key={index}>{player.name}</h2>
            )
        })
    }
    const quitRoom = () => {
        socket.emit('quitRoom', (quit) => {
            if (quit) {
                alert(quit)
                window.location.replace("https://jonarius-test.netlify.app/");
                console.log('Saindo da sala')
            }
        })
    }


    const changeDeck = () => {
        console.log('isDeckDixit, Euro, Nude, Peq', isDeckDixit, isDeckEuro, isDeckNude, isDeckPeq)
        socket.emit('changeDeck', isDeckDixit, isDeckEuro, isDeckNude, isDeckPeq)
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
                    }}/>
                    <h3>Cartas de Dixit</h3></div>
                    <div className="total-cartas">{numberOfCards} cartas</div> 
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

                                        }} /><h3>Corrida dos 30 pontos</h3></div>
                                <div className="victory-input">
                                    <input
                                        name="victory"
                                        type="radio"
                                        value="deck-victory"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                const value = e.target.value
                                                setVictory(value)
                                            }

                    }}/><h3>Jogar até o baralho acabar</h3></div>
                    </div>
                </div>
                </>) 
                : (<>
                    <div id="lobby-settings">
                    <div id="build-deck">
                    <h2>Baralho da Partida!</h2>
                    <div className="deck-input">
                    {isDeckPeq ? <h3>Cartas do Peq</h3> : null}
                    </div>
                    <div className="deck-input">
                    {isDeckNude ?<h3>Cartas de Nudes</h3> : null}
                    </div>
                    <div className="deck-input">
                    {isDeckEuro ?<h3>Cartas de Museus Europeus</h3> : null}
                    </div>
                    <div className="deck-input">
                    {isDeckDixit ? <h3>Cartas de Dixit</h3> : null}
                    </div>
                    <div className="total-cartas">{numberOfCards} cartas</div> 
                    </div>                       
                    <div id="victory-conditions">
                    <h2>Condições de vitória</h2>
                    <div className="victory-input">
                    {victoryConditions == "points-victory" ?<h3>Corrida dos 30 pontos</h3> : null}
                    </div>
                    <div className="victory-input">
                    {victoryConditions == "deck-victory" ?<h3>Jogar até o baralho acabar</h3> : null}
                    </div>
                    </div>
                </div>
                </>) }
                { !isStartButtonReady 
                    ? <h1>Esperando a galera...</h1> 
                : <h1>Esperando {roomData.host.name} iniciar a partida!</h1>
                }
                {renderIncommingPlayer()}
                {
                    (session.user.id === roomData.host.id && isStartButtonReady === true)
                        && (isDeckDixit || isDeckPeq || isDeckEuro || isDeckNude)
                        && (victoryConditions !== "")
                        && (numberOfCards >= 50)
                        ? <StartButton isDeckDixit={isDeckDixit} isDeckPeq={isDeckPeq} isDeckEuro={isDeckEuro} isDeckNude={isDeckNude} victoryConditions={victoryConditions} />
                        : null
                }
                <div className="leave-lobby" onClick={(e) => quitRoom(e)}><a>Sair da Sala</a></div>

            </div>
        </div>
    )
}

export default React.memo(RoomLobby)