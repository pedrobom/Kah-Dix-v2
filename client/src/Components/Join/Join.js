import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Join.css'
import { socket } from "../socket";

const Join = () => { 

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const CreateUser = () => {
        socket.emit('join', { name, roomName: room }, (error) => {
            if(error) {
              alert(error);
            }
        });
        console.log('createUser() em Join.js disparou socket.emit("join")')
    }

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Seja Mau-Vindo!</h1>
                <div><input placeholder="Escreve um apelido maroto..." className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div><input placeholder="Qual o nome da sala?" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                <Link onClick={event => (!name || !room) ? event.preventDefault() : CreateUser()}  to={`/GameRoom`}> 
                    <button className="button mt-20" type="submit">Manda bala</button>
                </Link>
            </div>
        </div>
    );
}

export default Join