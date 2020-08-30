import React, { useState, useEffect } from "react";

import Chat from '../Chat/Chat'
import RoomLobby from './RoomLobby/RoomLobby'
import Hand from './Hand/Hand'
import Table from './Table/Table'
import Score from './Score/Score'
import InputPrompt from './InputPrompt/InputPrompt'
import Menu from './Menu/Menu'

import './GameRoom.css'

import {socket} from "../socket.js"

// import io from 'socket.io-client'
// let socket;

const GameRoom = ({ location }) => {   
    const [roomData, setRoom] = useState()

    const [isGameStarted, setIsGameStarted] = useState(true)  
    const [isPromptSubmited, setIsPromptSubmited] = useState(false)

    useEffect(() => {
        socket.emit('userJoined')
        console.log('userJoined socket.emit')
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

            setRoom(roomData)
        })

    }, [roomData])
    
    if(roomData){
        return (
            <React.Fragment>
                
                <Menu />
                
                <h1 class="game-room-title">FRASE DO JONAS: PARABÉNS</h1>
                
                <div className="dixit-table">

                    {/* LOBBY ATIVO NA TELA DE TODOS OS JOGADORES DA SALA*/}
                    {roomData.state == "WAITING_FOR_PLAYERS" && <RoomLobby roomData={roomData} />}
                    
                    {/* PARA DESENVOLVER APENAS O ESTILO DO JOGO! */}
                    {/* {false && <RoomLobby roomData={roomData} />} */}
                    
            
                    { isPromptSubmited && <InputPrompt /> }            
                    <Table />
                    <Hand />
                    <Score roomData={roomData} />

                    {/* <Chat /> */}

                </div>
            </React.Fragment>
        )        
    }
    else{
        return (
            <h1>AGUARDE... CARREGANDO JOGO</h1>
        )
    }

}

export default GameRoom
