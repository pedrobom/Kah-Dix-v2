import React, { useState, useEffect } from "react";
import reactUuid from 'react-uuid'

import Prompt from './Prompt'
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
    const [isPromptSubmited, setIsPromptSubmited] = useState(false)

    useEffect(() => {
        socket.emit('userJoined')
        console.log('O usuário aentrou na sala e disparou socket.emit("userJoined")')
    }, [location.search] )


    useEffect(() => {
        const dropzones = document.querySelectorAll('[dixit-drop-zone=drop]')

        dropzones.forEach( dropzone => {
            dropzone.ondragover = e => e.preventDefault()
            dropzone.ondrop = function(e){
                const id = e.dataTransfer.getData('card-id')
                const card = document.getElementById(id)
                console.debug("Carta sendo dropada:")
                console.debug(card)
                card
                    ? dropzone.appendChild(card) 
                    : console.debug("A carta parece não existir! Verifique se o event listener 'ondragstart' está captando as informações corretamente")
            }    
        })
    }, [])


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

                    {roomData.prompt !== null
                        ? <Prompt prompt={`Frase de ${roomData.players[roomData.currentPlayerIndex].name}: ${roomData.prompt}`} />
                        : <Prompt prompt={`Esperando ${roomData.players[roomData.currentPlayerIndex].name}, o famoso lingua solta`} 
                    />}

                    <div className="dixit-table">
                        {/* LOBBY ATIVO NA TELA DE TODOS OS JOGADORES DA SALA*/}
                        { roomData.state === "WAITING_FOR_PLAYERS" && <RoomLobby />}
                        { roomData.state === "PICKING_PROMPT" && <InputPrompt /> }            
                        <Table />
                        <Hand />
                        <Score />
                        <Chat />
                    </div>     
                </RoomContext.Provider>
        )        
    }
    else{
        return (
            <div className="inside-room-loading-cointainer">
                <img id="loading-game-image" src={LoadingImg} />
                <h1>Aguarde o Carregamento do Jogo</h1>
            </div>
        )
    }

}

export default GameRoom
