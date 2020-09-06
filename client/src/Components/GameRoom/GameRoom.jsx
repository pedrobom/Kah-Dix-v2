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


// import io from 'socket.io-client'
// let socket;

export const RoomContext = React.createContext()

const GameRoom = ({ location }) => {   
    const [roomData, setRoomData] = useState()

    useEffect(() => {
        socket.once('roomData', (roomData) => {
            console.log("socket.on('roomData') = [%x]", JSON.stringify(roomData, null, 2))
            setRoomData(roomData)
        })

    }, [roomData])
    
    if(roomData){
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
    else{
        return (
            <div className="inside-room-loading-cointainer">
                <h1 className="game-room-title">Carregando Partida</h1>
                <img id="loading-game-image" src={LoadingImg} />
            </div>
        )
    }

}

export default GameRoom
