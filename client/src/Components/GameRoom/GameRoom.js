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
    const [user, setUser] = useState('');
    const [gameStarted, setStart] = useState('false')

    // const ENDPOINT = 'https://kah-dix.herokuapp.com/';

    // USER JOIN
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        // socket = io(ENDPOINT);
        setName(name);
        setRoom(room);

        socket.emit('join', { name, room })

        
        socket.on('UserConnected', user)
            setUser(user)

    }, [location.search]);

    return (
        <React.Fragment>
            <StartButton user={user} gameStarted />
            <HandTable />
            <Chat room={room} name={name}/>
        </React.Fragment>
      );
    }

export default GameRoom