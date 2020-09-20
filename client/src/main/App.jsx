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
            // setSession({ "user": { "createdAt": "2020-09-19T22:18:39.173Z", "id": "1", "name": "pipo", "socketIds": ["c0CxjqD75Bkn009XAACT"] }, "roomData": null })
        }

        socket.on('sessionData', onSessionData)

        // return () => {
        //     socket.removeListener('sessionData', onSessionData)
        // }
    }, [])

    // Esperar a sessão carregar para mostrar o jogo
    // TODO: fazer uma tela de carregar!
    // if (!session || !session.user) {
        // return null
    // }

    return <SessionContext.Provider value={value}>
        <Router>
            <Route path="/" exact component={Join} />
            <Route path="/GameRoom" component={GameRoom} />
        </Router>
    </SessionContext.Provider>

}