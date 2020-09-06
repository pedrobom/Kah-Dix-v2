import React, { useState, useEffect } from "react";

import Header from './Header/Header'
import Prompt from './Prompt/Prompt'
import Chat from '../Chat/Chat'
import RoomLobby from './RoomLobby/RoomLobby'
import EndScreen from "./EndScreen/EndScreen";
import Hand from './Hand/Hand'
import Table from './Table/Table'
import Score from './Score/Score'
import Menu from './Menu/Menu'
import LoadingImg from '../../assets/images/loadingImg'
import carinha from '../../assets/images/carinha'
import './GameRoom.css'

import {socket} from "../socket.js"
import TurnResults from "./TurnResults/TurnResults";
import { Redirect } from "react-router";


// import io from 'socket.io-client'
// let socket;

export const RoomContext = React.createContext()

const GameRoom = ({ location }) => {   
    const [roomData, setRoomData] = useState()
    const [isSettingUp, setIsSettingUp] = useState(true)

    console.log("OUTSIDE %s", location)

    // Efeitos para buscar informações no servidor e escutar coisas da sala
    useEffect(() => {

        if (!isSettingUp) {
            console.log("Already set up!")
            return
        }

        // Carregar os dados
        console.log("Carregando os dados da sala no GameRoom e escutando mudança de dados da sala!")

        // Escutando dados da sala
        let onRoomData = (roomData) => {
            console.log("socket.on('roomData') = [%x]", JSON.stringify(roomData, null, 2))
            setRoomData(roomData)
        }
        socket.addEventListener('roomData', onRoomData)

        // Buscando dados iniciais da sessão
        socket.emit("fetchMySession", (err, sessionData) => {
            console.log('Session data:', sessionData)
            setRoomData(sessionData.roomData)
            setIsSettingUp(false)
        })

        return () => {
            console.log('Cleanup of GameRoom')
            socket.removeListener('roomData', onRoomData)
        }

    }, [])

    if (isSettingUp) {
        console.log("Ainda carregando dados da sala!")
        return <div className="inside-room-loading-cointainer">
            <h1 className="game-room-title">Carregando Partida</h1>
            <img id="loading-game-image" src={LoadingImg} />
        </div>
    } 

    if (!roomData) {
        console.log("Não estamos em uma sala! Vamos voltar para a lobby :)", roomData)
        return <Redirect to="/"/>
    }
    
    return (
            <RoomContext.Provider value={roomData}>
                <Chat />
                { roomData.state === "WAITING_FOR_PLAYERS" && <RoomLobby />}
                <div className="gameRoom">
                    <Header />   
                    <Menu />                 
                    {roomData.prompt !== null
                    ? <Prompt prompt={`${roomData.players[roomData.currentPlayerIndex].name} diz: ${roomData.prompt}`} />
                    : <Prompt prompt={`Esperando ${roomData.players[roomData.currentPlayerIndex].name} mandar aquele bordão solerte`} 
                    />}
                    {/* LOBBY ATIVO NA TELA DE TODOS OS JOGADORES DA SALA*/}
                    {/* { roomData.state === "PICKING_PROMPT" && <InputPrompt /> }             */}
                    <Table canDrop={"true"}/>
                    <Score />
                    <Hand />
                    <img id="carinha-image" src={carinha} />
                </div>
                    {(roomData.state === "PICKING_PROMPT" && roomData.turn > 1) && <TurnResults />}
                    { roomData.state === "GAME_ENDED" && <EndScreen />}
                    
            </RoomContext.Provider>
    )        


}

export default GameRoom
