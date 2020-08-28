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

    // DRAG & DROP FUNCIONALITY
    /*
    *   BUG: se arrastar rápido demais a gente leva para o dropzone,
    *        um elemento sem ser node, o que faz quebrar o AppenChild!
    */
    useEffect(() => {
        const cardsElements = document.querySelectorAll('[dixit-drop-zone=drop] .card')

        cardsElements.forEach( (card, index) => {
            card.setAttribute('id', `draggable-card-${index}`)
            card.ondragstart = e => {
                e.dataTransfer.setData('card-id', e.target.id)
            }
        })

        const dropzones = document.querySelectorAll('[dixit-drop-zone=drop]')

        dropzones.forEach( dropzone => {
            dropzone.ondragover = e => e.preventDefault()
            dropzone.ondrop = function(e){
                const id = e.dataTransfer.getData('card-id')
                const card = document.getElementById(id)
                dropzone.appendChild(card)
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
