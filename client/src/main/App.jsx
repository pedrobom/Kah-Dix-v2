import React, {useState, useEffect} from 'react';
import './App.css'
import socket from '../Components/socket'

import { Redirect, BrowserRouter as Router, Route} from 'react-router-dom';

import Join from "../Components/Join/Join.js"
import GameRoom from "../Components/GameRoom/GameRoom.jsx"

import SessionContext from "../Components/SessionContext"


export default (props) => {   
    const [session, setSession] = useState(null);
    const value = { session, setSession };

    useEffect(() => {

        console.log("Escutando mudanças da minha sessão!")
        let onSessionData = (sessionData) => {
            console.log("Dados de sessão atualizados!", sessionData)
            setSession(sessionData || {})
        }

        socket.on('sessionData', onSessionData)

        // return () => {
        //     socket.removeListener('sessionData', onSessionData)
        // }
    }, [])

    return <SessionContext.Provider value={value}>
        <Router>
            <Route path="/" exact component={Join} />
            <Route path="/GameRoom" component={GameRoom} />
        </Router>
    </SessionContext.Provider>

}