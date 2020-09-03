import React, { useState, useEffect } from "react";

import Prompt from './Prompt/Prompt'
import Chat from '../Chat/Chat'
import RoomLobby from './RoomLobby/RoomLobby'
import Hand from './Hand/Hand'
import Table from './Table/Table'
import Score from './Score/Score'
import InputPrompt from './InputPrompt/InputPrompt'
import Menu from './Menu/Menu'
import LoadingImg from '../../assets/images/loadingImg'

import './GameRoom.css'

import {socket} from "../socket.js"

// import io from 'socket.io-client'
// let socket;

export const RoomContext = React.createContext()

const GameRoom = ({ location }) => {   
    const [roomData, setRoomData] = useState()

    useEffect(() => {
        socket.on('roomData', (roomData) => {
            console.log('GameLobby = Recebendo atualização RoomData do server')
            console.log("socket.on('roomData') = [%x]", roomData)
            setRoomData(roomData)
        })

    }, [])
    
    if(roomData){
        return (
                <RoomContext.Provider value={roomData}>
                    <Menu />
                    <Chat />
                    {roomData.prompt !== null
                        ? <Prompt prompt={`Frase de ${roomData.players[roomData.currentPlayerIndex].name}: ${roomData.prompt}`} />
                        : <Prompt prompt={`Esperando ${roomData.players[roomData.currentPlayerIndex].name}, o famoso lingua solta`} 
                    />}

                    <div className="dixit-table">
                        {/* LOBBY ATIVO NA TELA DE TODOS OS JOGADORES DA SALA*/}
                        { roomData.state === "WAITING_FOR_PLAYERS" && <RoomLobby />}
                        { roomData.state === "PICKING_PROMPT" && <InputPrompt /> }            
                        <Table canDrop={"true"}/>
                        <Hand />
                        <Score />
                        
                    </div>     
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
