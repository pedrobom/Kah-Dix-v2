
import React, {  useContext } from 'react'

import './RoomDetails.css'
import GameContext from '../../GameContext/GameContext'
import socket from '../../../socket'

export default React.memo(function RoomDetails() {
    const {roomData} = useContext(GameContext)


    const quitRoom = () => {
        console.log("Usuário tentando sair da partida!")
        if(window.confirm("Você tem certeza? Não poderá voltar para essa partida.")) {
            console.log("Usuário confirmou que quer sair")
            socket.emit('quitRoom', (quit) => {
                if(quit){
                    alert(quit)
                    window.location.replace("/");
                    return false;
                }
            })
        } else {
            console.log("Usuário desistiu de sair :)")
        }
    }

    return(
        <div className="roomDetails">
            <div className="roomName">
                Sala: <span>{ roomData.name }</span>
            </div>
            <div className="roomControls">
                <a onClick={quitRoom}>sair</a>
            </div>
        </div>
    )
})
