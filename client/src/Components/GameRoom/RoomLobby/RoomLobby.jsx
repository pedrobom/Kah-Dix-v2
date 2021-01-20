import React, { useState, useEffect, useContext,useMemo } from 'react'
import './RoomLobby.css'
import { socket } from '../../socket'
import GameContext from '../GameContext/GameContext'
import StartButton from './StartButton/StartButton'
import SessionContext from "../../SessionContext"
import { Redirect } from 'react-router'
import DeckSelector from './DeckSelector/DeckSelector'
import loadingImg from '../../../assets/images/loadingImg'
import snadesImg from '../../../assets/images/snades'

function RoomLobby() {

    console.log('renderizando Componente RoomLobby')
    const {roomData, amIHost } = useContext(GameContext)

    const [selectedDecksIds, setSelectedDecks] = useState([])
    const [selectedVictory, setSelectedVictory] = useState(null)
    
    
    const { session, setSession } = useContext(SessionContext)

    // Guarda quais sao os decks disponiveis, baseado no roomData
    const availableDecks = useMemo(() => roomData && roomData.availableDecks || [])
    // Soma o total de cartas sempre que a selecao de decks muda
    const numberOfCards = useMemo(() => availableDecks.filter(deck => selectedDecksIds.indexOf(deck.id) != -1).reduce((total, deck) => total + deck.totalCards, 0));
    // Guarda quais sao as condicoes de vitoria disponiveis, baseado no roomData
    const availableVictoryConditions = useMemo(() => roomData && roomData.availableVictoryConditions || [])

    // O jogo já acabou ou estamos começando?
    const hasGameEnded = useMemo(() => roomData && roomData.state == 'GAME_ENDED')

    // Estamos prontos para começar? :)
    const isStartButtonReady = useMemo(() => {
        console.log("Computando botão de start", roomData, numberOfCards, amIHost)
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

    // Renderizacao do fim de jogo
    const renderEndScreen = () => {
        return <div className="room-lobby-end-screen">
            { roomData && renderChampion() }
            { roomData && renderPlayersScores() }
        </div>
    }

    // Renderiza os vencedores! Só é usado se for o fim do jogo :)
    const renderChampion = () => {
        return roomData.winner.map(player => {
            return (
                <div className="championBox">
                    <img id="snades" src={snadesImg} alt="snades"/>           
                    <div class="parabens rainbow"><span class="text">PARABÉNS!</span></div>
                    <div class="nome superhero"><span class="text">{player.name}</span></div> 
                    <div class="score tilt"><span class="text">Fez {player.score} pontos!</span></div>    
                    <img id="jonas" src={loadingImg} alt="Jonas"/>           
                </div>
            )            
        })
    }

    //Renderiza o total de pontos de cada jogador :)
    function renderPlayersScores(){
        if(roomData){
            return <div className="players-scores">
                { roomData.players
                        .sort((a, b) => a.score > b.score ? -1 : 1)
                        .map((player, index) => {
                        return(
                            <div className="player-score" key={index}>{player.name} ({player.score} pontos)</div>
                        )
                    })   
                }
            </div>          
        }
    }



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
                    {
                        // Se o jogo acabou, vamos mostrar o fim do jogo
                        hasGameEnded && renderEndScreen()
                    }
                    {
                        // cabecalho
                        amIHost
                        ? <h1>Ajuste as configurações abaixo e comece o jogo!</h1>
                        : <h1>Esperando <b>{roomData.host.name}</b> iniciar {hasGameEnded ? 'uma nova' : 'a'} partida!</h1>
                    }

                    {
                        // Detalhes sobre os decks e as coisas de vitoria
                        decksAndVictoryConditions}
                    
                    {
                        // botao de start
                        (amIHost)
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