import React, { useContext } from 'react'
import './Header.css'
import { RoomContext } from '../GameRoom'
import socket from '../../socket'
import Regras from '../Regras/Regras'
import Artists from '../Artists/Artists'


function Header () {
    const roomData = useContext(RoomContext)

    const openResults = e => {
        e.preventDefault()
        const resultsContainer = document.querySelector('.background-results')
        if(resultsContainer)resultsContainer.classList.toggle('results-hide')
    }
    const quitRoom = () => {
        socket.emit('quitRoom', (quit) => {
            if(quit){
            alert(quit)
            window.location.reload()
            return false;
            } 
        })
    }

    return(  
            <header className="header">
                <div className="header-content-left">
                    <h3 className="logo">Jonarius-Dix!</h3>
                    <div className="header-links">
                        <a onClick={(e) => quitRoom(e)}>Sair da partida</a>
                        <Regras />
                        { (roomData.turn > 1) ? (<><a onClick={(e) => openResults(e)}>Último turno</a></>) : null}            
                    </div> 
                </div>
                <div className="header-content-right">
                    <div className="header-links">
                        <Artists />
                        <a>Seja um Colaborador</a>
                    </div>
                </div>
            </header>
    )
}

export default React.memo(Header)