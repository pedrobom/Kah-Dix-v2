import React, { useState, useEffect, useContext, useMemo } from "react";

import Header from './Header/Header'
import RoomLobby from './RoomLobby/RoomLobby'
import EndScreen from "./EndScreen/EndScreen";
import GameBoard from "./GameBoard/GameBoard";
import Sidebar from "./Sidebar/Sidebar";
import LoadingImg from '../../assets/images/loadingImg'
import carinha from '../../assets/images/carinha'
import './GameRoom.css'
import { Redirect, useParams } from "react-router";
import SessionContext from "../SessionContext"
import GameContext, {GameContextProvider} from "./GameContext/GameContext"

// Simple mock data for testing :)
import mock from '../../game-room-tests'


// Um wrapper simples ao redor do GameRoom para colocar o contexto :)
export default (props) => {
    return <GameContextProvider>
        <GameRoom {...props}>{props.children}</GameRoom>
    </GameContextProvider>
}

// O GameRoom de fato, com o contexto colocado!
const GameRoom = ({ location }) => {   

    const { roomName } = useParams()
    const {roomData} = useContext(GameContext)

    const { session } = useContext(SessionContext)

    console.log("OUTSIDE", location)

    if (!roomName) {
        console.log("Sem nome de sala! Voltando para a hoem")
        return <Redirect to="/"/>
    }

    // Esperando o servidor mandar dados :)
    if (!session || !session.user) {
        console.log("Ainda carregando dados da sala!")
        return <div className="inside-room-loading-cointainer">
            <h1 className="game-room-title">Carregando Partida</h1>
            <img id="loading-game-image" src={LoadingImg} />
        </div>
    } 

    // O usuário não tem uma sala ainda, vamos redirecionar ele para o join :)
    // Deve ter pego o link de alguem
    if (!roomData && roomName) {
        console.log("Voltando para a home com link para a sala :)!")
        return <Redirect to={"/?roomName=" + encodeURIComponent(roomName)}  />
    }

    // Não existe sala para nós, então não podemos estar no GameRoom!
    if (!roomData) {
        console.log("Não estamos em uma sala! Vamos voltar para a lobby :)", roomData)
        return <Redirect to="/"/>
    }

    return (
        <>
        <div className={"gameRoom "+ roomData.state}>
            <Header/>   
            <Sidebar></Sidebar>
            { roomData.state === "GAME_ENDED" || roomData.state ==="WAITING_FOR_PLAYERS" 
                ? <RoomLobby />
                  : <GameBoard/>
            }
            {/* <img id="carinha-image" src={carinha} /> */}
        </div>
        </>
    )        


}
