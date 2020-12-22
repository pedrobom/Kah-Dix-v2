import React, { useState, useEffect, useContext, useMemo } from "react";

import Header from './Header/Header'
import RoomLobby from './RoomLobby/RoomLobby'
import EndScreen from "./EndScreen/EndScreen";
import GameBoard from "./GameBoard/GameBoard";
import Sidebar from "./Sidebar/Sidebar";
import LoadingImg from '../../assets/images/loadingImg'
import carinha from '../../assets/images/carinha'
import './GameRoom.css'

import { socket } from "../socket.js"
import TurnResults from "./TurnResults/TurnResults";
import { Redirect, useParams } from "react-router";
import SessionContext from "../SessionContext"

// Simple mock data for testing :)
import mock from '../../game-room-tests'

// import io from 'socket.io-client'
// let socket;

export const RoomContext = React.createContext()


export default ({ location }) => {   

    const { roomName } = useParams()

    const { session } = useContext(SessionContext)
    const [roomDataFromEvent, setRoomDataFromEvent] = useState()
    const roomData = useMemo(() => roomDataFromEvent || (session && session.roomData), [session, roomDataFromEvent]);

    console.log("OUTSIDE", location)

    // Efeitos para buscar informações no servidor e escutar coisas da sala
    useEffect(() => {

        // Carregar os dados
        console.log("Carregando os dados da sala no GameRoom e escutando mudança de dados da sala!")

        // Escutando dados da sala
        let onRoomData = (roomData) => {
            console.log("socket.on('roomData') = ", roomData)
            setRoomDataFromEvent(roomData)
        }
        socket.addEventListener('roomData', onRoomData)

        return () => {
            console.log('Cleanup of GameRoom')
            socket.removeListener('roomData', onRoomData)
        }

    }, [])

    
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
            <RoomContext.Provider value={roomData}>
                <div className={"gameRoom "+ roomData.state}>
                    <Header />   
                    <Sidebar></Sidebar>
                    { roomData.state === "WAITING_FOR_PLAYERS" ? 
                        <RoomLobby />
                          : <GameBoard/>
                    }
                    {/* <img id="carinha-image" src={carinha} /> */}
                </div>
                { roomData.state === "GAME_ENDED" && <EndScreen />}
                    
            </RoomContext.Provider>
    )        


}
