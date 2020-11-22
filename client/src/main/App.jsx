import React, {useState, useEffect} from 'react';
import './App.css'
import socket from '../Components/socket'

import { Redirect, BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Join from "../Components/Join/Join.js"
import GameRoom from "../Components/GameRoom/GameRoom.jsx"
import RotatePhoneIcon from '../assets/icons/rotate_phone.svg'

import SessionContext from "../Components/SessionContext"


export default (props) => {   
    const [session, setSession] = useState(null);
    const value = { session, setSession };

    useEffect(() => {

        console.log("Escutando mudanças da minha sessão!")
        let onSessionData = (sessionData) => {
            console.log("Dados de sessão atualizados!", sessionData)
              setSession(sessionData || {})
            //  setSession({ "user": null, "roomData": null })
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
    <div className="mobile-orientation-notice-overlay">
        <h1>Por favor jogue com celular<br></br> ou tablet deitado :)</h1>
        <img src={RotatePhoneIcon} />
    </div>
        <Router>
            <Switch>
                <Route path="/" exact component={Join} />
                <Route path="/GameRoom/:roomName" exact component={GameRoom} />
                <Redirect from="*" to="/"/>
            </Switch>
        </Router>
    </SessionContext.Provider>

}