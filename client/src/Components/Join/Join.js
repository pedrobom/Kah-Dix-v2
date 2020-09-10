import React, { useState , useContext} from "react";
import { Link } from 'react-router-dom';
import './Join.css'
import { socket } from "../socket";
import SessionContext from '../SessionContext'
import { Redirect } from "react-router";

const Join = () => { 

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const { session, setSession } = useContext(SessionContext)

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
        return <Redirect to="/GameRoom"/>
    }

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <div class="wordartblues"><span class="text">Versão de Teste!</span></div>
                <h1 className="heading">Olá!</h1>
                
                <div><input placeholder="Escreve um apelido maroto..." className="joinInput mt-20" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div><input placeholder="Qual o nome da sala?" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                <Link onClick={event => (!name || !room) ? event.preventDefault() : CreateUser()}  to={`/GameRoom`}> 
                    <button className="button mt-20" type="submit">Manda bala</button>
                </Link>
            </div>
        </div>
    );
}

export default Join