import React, { useState, useEffect } from "react";
import queryString from 'query-string';

import AllCards from '../allCards'
import Chat from '../Chat/Chat'
import RoomLobby from './RoomLobby/RoomLobby'
import HandTable from "./HandTable/HandTable";
import Card from './Card/Card'
import Hand from './Hand/Hand'
import Table from './Table/Table'

import './GameRoom.css'

import {socket} from "../socket.js"
import allCards from "../allCards";



// import io from 'socket.io-client'
// let socket;

const GameRoom = ({ location }) => { 

    const cardArray = AllCards

    const [name, setName] = useState('')
    const [room, setRoom] = useState([])
    const [users, setUsers] = useState([]);
    const [players, setPlayers] = useState(['1']);
    const [startButton, setStartButton] = useState(true)   

    useEffect(() => {
        socket.emit('userJoined')
        console.log('userJoined socket.emit')

    }, [location.search] )

    useEffect(() => {
        socket.on('playerJoinedRoom', (player) => {
            console.log('socket.on("playerJoinedRoom") - setPlayers()')
            setPlayers([...players, player])

        })
        console.log(players)
    }, [players])


    useEffect(() => {
        console.log("rodando useEffect setName e setRoom")
        const {name} = queryString.parse(location.search)
        setName(name)
    }, [location.search])

    // DRAG & DROP FUNCIONALITY
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
        socket.on('startButtonPressed', button => {
            setStartButton(false)
        })
    }, [])

    const renderCard = () => {
        return cardArray.map(src => {
            return (
                <Card src={src} alt={"COMPONENTE CARTA"}/>
            )
        })
    }

    return (
        <div className="dixit-table">

            {startButton && <RoomLobby />}
            <Table>
                {renderCard()}
            </Table>

            <Hand>
            </Hand>
            {/* <Chat room={room} name={name}/> */}

        </div>
    )
}

export default GameRoom
