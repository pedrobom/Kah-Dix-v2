import React, { useState, useEffect } from "react";
import queryString from 'query-string';

import Chat from '../Chat/Chat'
import RoomLobby from './RoomLobby/RoomLobby'
import Hand from './Hand/Hand'
import Table from './Table/Table'
import Score from './Score/Score'

import './GameRoom.css'

import {socket} from "../socket.js"



// import io from 'socket.io-client'
// let socket;

const GameRoom = ({ location }) => {   

    const [name, setName] = useState('')
    const [room, setRoom] = useState([])
    const [users, setUsers] = useState([]);
    const [isGameStarted, setIsGameStarted] = useState(true)   

    useEffect(() => {
        socket.emit('userJoined')
        console.log('userJoined socket.emit')
    }, [location.search] )


    useEffect(() => {
        console.log("rodando useEffect setName e setRoom")
        const {name} = queryString.parse(location.search)
        setName(name)
    }, [location.search])


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
            setIsGameStarted(false)
            socket.emit('dealCards')
        })
    }, [location.search])

    

    return (
        <div className="dixit-table">

            {isGameStarted && <RoomLobby />}
            <Table />
            <Hand />
            <Score />

            {/* <Chat room={room} name={name}/> */}

        </div>
    )
}

export default GameRoom
