import React, { useState, useEffect } from "react";
import queryString from 'query-string';

import Chat from '../Chat/Chat'
import RoomLobby from './RoomLobby/RoomLobby'
import Hand from './Hand/Hand'
import Table from './Table/Table'
import Score from './Score/Score'
import InputPrompt from './InputPrompt/InputPrompt'

import './GameRoom.css'

import {socket} from "../socket.js"



// import io from 'socket.io-client'
// let socket;

const GameRoom = ({ location }) => {   

    const [isGameStarted, setIsGameStarted] = useState(false)  
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

    // DISABLE START BUTTON
    useEffect(()=> {
        socket.on('startButtonPressed', () => {
            setIsGameStarted(true)
            socket.emit('dealCards')
        })
    }, [location.search])

    

    return (
        <React.Fragment>
        <h1 class="game-room-title">KAH DIXIT DOS MINA-MANOS</h1>
        <div className="dixit-table">

            {/* ESPERANDOJOGADORES: */}
            {!isGameStarted && <RoomLobby />}
            
            { isPromptSubmited && <InputPrompt /> }            
            <Table />
            <Hand />
            <Score />

            {/* <Chat /> */}

        </div>
        </React.Fragment>
    )
}

export default GameRoom
