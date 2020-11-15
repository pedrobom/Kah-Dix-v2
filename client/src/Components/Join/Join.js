import React, { useState , useContext, useMemo} from "react";
import { Link } from 'react-router-dom';
import './Join.css'
import { socket } from "../socket";
import SessionContext from '../SessionContext'
import { Redirect, useLocation } from "react-router";
import {isMobile} from 'react-device-detect';
import snadesImg from "../../assets/images/snades";

const Join = () => { 

    const location = useLocation()

    // Room name que veio com o link
    const roomNameFromLink = location && new URLSearchParams(location.search).get('roomName')

    const [name, setName] = useState('');
    const [room, setRoom] = useState(roomNameFromLink || '');

    const { session, setSession } = useContext(SessionContext)

    const EnterRoom = (event) => {
        event.preventDefault()
        console.log("Tentando entrar na sala!")
        if (!name || !room) {
            console.log("Ainda faltaw nome ou sala.. esperando mais")
        } else {
            console.log("Entrando na sala!")
            CreateUser()
        }
    }

    const CreateUser = () => {
        socket.emit('join', { name, roomName: room }, (error, roomData) => {
            if(error) {
              alert(error);
              return
            }
            console.log("Entramos na sala! Aqui estão os detalhes :) Atualizando sessão", roomData)
            setSession({ user: session.user, roomData: roomData })
        });
        console.log('createUser() em Join.js disparou socket.emit("join")')
    }

    // Redireciona usuário para GameRoom se já houver alguma sala
    if (session && session.roomData) {
        console.log("Já estamos em uma sala! Redirecionando para GameRoom", session.roomData)
        return <Redirect to={"/GameRoom/" + encodeURIComponent(session.roomData.name)}  />
    }

    if (roomNameFromLink) {
        console.info("Renderizando com roomName do link [%s]", roomNameFromLink)
    }

    const renderContent = () => {
        return <div className="joinOuterContainer">
                <div className="joinInnerContainer">
                    <div className="wordartblues"><span className="text">Versão de Teste!</span></div>
                    <h1 className="heading">Olá!</h1>
                    <form onSubmit={event => EnterRoom(event)}>
                        <div><input autoFocus placeholder="Escreve um apelido maroto..." className="joinInput mt-20" type="text" onChange={(event) => setName(event.target.value)} /></div>
                        <div><input placeholder="Qual o nome da sala?" className="joinInput mt-20" type="text" value={room} onChange={(event) => setRoom(event.target.value)} /></div>
                        <button className="button mt-20" type="submit">Manda bala</button>
                    </form>
                </div>
            </div>            
    }
    
    return (
        <>
        {renderContent()}
        </>
    )
}

export default Join