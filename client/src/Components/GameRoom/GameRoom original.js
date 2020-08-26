import React, { useState, useEffect } from "react";
import queryString from 'query-string';

import Chat from '../Chat/Chat'
import StartButton from './StartButton/StartButton'
import HandTable from "./HandTable/HandTable";

import './GameRoom.css'

import {socket} from "../socket.js"


// import io from 'socket.io-client'
// let socket;

const GameRoom = ({ location }) => { 

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState([]);
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

    useEffect(() =>{ 
        socket.on('roomData', roomData => {
            const { users,  } = roomData
            setUsers(users)
            
            console.log(users)
        })
    }, [users])



     const renderUsers = () => {
        return users.map((user, index) => {
            return (
                <h2>{user.name}</h2>
            )
        })
    }

    return (
        <React.Fragment>
            <div> 
                <h1>Usuários Conectados:</h1>
                {renderUsers()}
            </div>
            {true ? <StartButton /> : <h1>Esperando Começar o Jogo</h1>}
            <HandTable />
            <Chat room={room} name={name}/>
        </React.Fragment>
      );
    }

export default GameRoom