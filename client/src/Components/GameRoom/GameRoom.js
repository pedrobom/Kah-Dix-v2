import React, { useState, useEffect } from "react";
import queryString from 'query-string';

import AllCards from '../allCards'
import Chat from '../Chat/Chat'
import StartButton from './StartButton/StartButton'
import HandTable from "./HandTable/HandTable";
import Card from './Card/Card'

import './GameRoom.css'

import {socket} from "../socket.js"
import allCards from "../allCards";


// import io from 'socket.io-client'
// let socket;

const GameRoom = ({ location }) => { 

    const { card1, card2, card3, cardback } = AllCards

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState([]);
    const [startButton, setStartButton] = useState(true)
    const [gameStarted, setStart] = useState(false)

    // const ENDPOINT = 'https://kah-dix.herokuapp.com/';

    // USER JOIN
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        // socket = io(ENDPOINT);
        setName(name);
        setRoom(room);
        const setFirst = users.length ? true : false 

        socket.emit('join', { name, room, setFirst })

    }, [location.search]);

    // OBJECT ARRAY OF ALL USERS IN THIS ROOM:
    useEffect(() =>{ 
        socket.on('roomData', roomData => {
            const { users,  } = roomData
            setUsers(users)
            
            console.log(users)
        })
    }, [users])

    // APPLY DRAGABBLE CARDS EFFECT< FROM DEALER TO PLAYER HAND:
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

     const renderUsers = () => {
        return users.map((user, index) => {
            return (
                <h2>{user.name}</h2>
            )
        })
    }

    return (
        <div className="dixit-table">
            <div> 
                <h1>Usuários Conectados:</h1>
                {renderUsers()}
            </div>
            {startButton ? <StartButton /> : <h1>Esperando Começar o Jogo</h1>}
            
            <HandTable />

            <div className="player-hand" dixit-drop-zone="drop">                
                <Card src={card1} />
                <Card src={card2} />
                <Card src={card3} />
                <Card src={cardback} />
            </div>

            <div className="dealer-table" dixit-drop-zone="drop">  
            </div>            

            {/* <Chat room={room} name={name}/> */}
        </div>
      );
    }

export default GameRoom