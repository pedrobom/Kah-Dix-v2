import React, { useState, useEffect, useContext,useMemo } from 'react'
import './RoomLobby.css'
import { socket } from '../../socket'
import { RoomContext } from '../GameRoom'
import StartButton from './StartButton/StartButton'
import SessionContext from "../../SessionContext"
import { Redirect } from 'react-router'
import DeckSelector from './DeckSelector/DeckSelector'

function RoomLobby() {

    console.log('renderizando Componente RoomLobby')
    const roomData = useContext(RoomContext)

    const [selectedDecksIds, setSelectedDecks] = useState([])
    const [selectedVictory, setSelectedVictory] = useState(null)
    
    
    const { session, setSession } = useContext(SessionContext)

    // Guarda quais sao os decks disponiveis, baseado no roomData
    const availableDecks = useMemo(() => roomData && roomData.availableDecks || [])
    // Soma o total de cartas sempre que a selecao de decks muda
    const numberOfCards = useMemo(() => availableDecks.filter(deck => selectedDecksIds.indexOf(deck.id) != -1).reduce((total, deck) => total + deck.totalCards, 0));
    const isHost = useMemo(() => session.user.id === roomData.host.id)
    // Guarda quais sao as condicoes de vitoria disponiveis, baseado no roomData
    const availableVictoryConditions = useMemo(() => roomData && roomData.availableVictoryConditions || [])

    // Estamos prontos para começar? :)
    const isStartButtonReady = useMemo(() => {
        console.log("Computando botão de start", roomData, numberOfCards)
        return roomData 
            && roomData.minimumPlayersToStart <= roomData.players.length
            && roomData.minimumCardsToStart <= numberOfCards
        
    })

    // Herdar valores do roomdata, que é sempre a fonte de verdede :)
    useEffect(() => {
        setSelectedDecks(roomData.selectedDecksIds)
        setSelectedVictory(roomData.victory)
    }, [roomData])

    // function renderIncommingPlayer() {
    //     return roomData.players.map((player, index) => {
    //         if (roomData.host.name == player.name) return (<h2 key={index}>{player.name} (Líder da presepada)</h2>)
    //         return (
    //             <h2 key={index}>{player.name}</h2>
    //         )
    //     })
    // }
    const quitRoom = () => {
        socket.emit('quitRoom', (quit) => {
            if (quit) {
                alert(quit)
                window.location.replace("/");
                console.log('Saindo da sala')
            }
        })
    }

    const toggleDeck = (deck) => {
        console.log("Configurando o deck:", deck)
        // Inverter a selecao :)
        deck.selected = !deck.selected
        var index = selectedDecksIds.indexOf(deck.id)
        if (index != -1) {
            console.log("Removendo deck [%s]", deck.id)
            selectedDecksIds.splice(index, 1);
        } else {
            console.log("Adicionando deck [%s]", deck.id)
            selectedDecksIds.push(deck.id)
        }
        // Usado apenas para trigar a deteção de variacao dos
        // decks no react!.. precisamos de um novo objeto de array
        // de decks para ele entender que mudou.. :)
        setSelectedDecks([].concat(selectedDecksIds))
        socket.emit('changeDeck', deck.id)
    }

    const setVictory = (victory) => {
        console.log("Setando condiçao de vitoria para [%s]", victory)
        socket.emit('victoryChange', victory)
    }

    let decksAndVictoryConditions = null

    // Somos o host?
    // Separando a logica para mostrar os decks e condicoes de vitoria
    // para nao ficar tudo junto
    if (session.user.id == roomData.host.id) {
        decksAndVictoryConditions = <>
            <div id="lobby-settings">
                <div id="build-deck">
                    <h2>Monte o seu Baralho!</h2>
                    {
                        // Aqui montamos o HTML para cada DECK :)
                        availableDecks.map(deck =>
                            <button className={"deck-input " + (selectedDecksIds.indexOf(deck.id) != -1 ? "deck-selected" : "")  }
                                onClick={(e) => { toggleDeck(deck)   }}
                            >
                                <i className='fas fa-check'></i>
                                <h3>{deck.name}</h3>
                            </button>)
                    }
                    <div className={"total-cartas " + (numberOfCards > 50 ? 'total-ready' : '')}>{numberOfCards} cartas</div>
                </div>
                <div id="victory-conditions">
                    <h2>Condições de vitória</h2>
                    {
                        // Aqui montamos o HTML para cada DECK :)
                        availableVictoryConditions.map(victoryCondition =>
                            <button className={"victory-input " + (victoryCondition.id == selectedVictory ? "victory-selected" : "")}
                                onClick={(e) => { setVictory(victoryCondition.id)   }}>
                                <i className='fas fa-check'></i>
                                <h3>{victoryCondition.name}</h3>
                                </button>)
                    }
                </div>
            </div>
        </>
    } else {

        decksAndVictoryConditions = <>
            <div id="lobby-settings">
                <div id="build-deck">
                    <h2>Baralho da Partida!</h2>
                    {
                        // Aqui montamos o HTML para cada DECK :)
                        availableDecks
                            .filter(deck => selectedDecksIds.indexOf(deck.id) != -1)
                            .map(deck =>
                            <div className={"deck-input deck-selected" }>
                                <i className='fas fa-check'></i>
                                <h3>{deck.name}</h3>
                            </div>)
                    }
                    <div className={"total-cartas " + (numberOfCards > 50 ? 'total-ready' : '')}>{numberOfCards} cartas</div>
                </div>
                <div id="victory-conditions">
                    <h2>Condições de vitória</h2>
                    {
                        // Aqui montamos o HTML para cada DECK :)
                        availableVictoryConditions
                        .filter(victoryCondition => victoryCondition.id == selectedVictory)
                        .map(victoryCondition =>
                            <div className={"victory-input " + (victoryCondition.id == selectedVictory ? "victory-selected" : "")}>
                                <i className='fas fa-check'></i>
                                <h3>{victoryCondition.name}</h3>
                                </div>)
                    }
                </div>
            </div>
        </>
    }

    return (
        <div className="roomLobby">
            <div id="background-start-button">
                <div id="wrapper">
                    {isHost
                        ? <h1>Ajuste as configurações abaixo e comece o jogo!</h1>
                        : <h1>Esperando <b>{roomData.host.name}</b> iniciar a partida!</h1>
                    }

                    {decksAndVictoryConditions}
                    
                    {
                        (isHost)
                            ? <StartButton ready={isStartButtonReady}/>
                            : null
                    }
                    {/* <div className="leave-lobby" onClick={(e) => quitRoom(e)}><a>Sair da Sala</a></div> */}

                </div>
            </div>
        </div>
    )
}

export default React.memo(RoomLobby)