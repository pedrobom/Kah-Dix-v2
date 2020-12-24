import React, { useContext } from 'react'
import './Header.css'
import { RoomContext } from '../GameRoom'
import socket from '../../socket'
import Regras from '../Regras/Regras'
import Artists from '../Artists/Artists'


function Header () {
    const roomData = useContext(RoomContext)

    const openResults = e => {
        console.log("Vendo resultandos do último turno!")
        e.preventDefault()
        const resultsContainer = document.querySelector('.background-results')
        if(resultsContainer)resultsContainer.classList.toggle('results-hide')
    }

    return(  
            <header className="header">
                <div className="header-content-left">
                    <h3 className="logo">Jonarius</h3>
                </div>
                <div className="header-content-right">
                    <div className="header-links">
                    { (roomData.turn > 1) ? (<><p onClick={(e) => openResults(e)}>Ver Último turno</p></>) : null}
                        <Regras />
                        <Artists />
                        <p>Seja um Colaborador</p>
                    </div>
                </div>
            </header>
    )
}

export default React.memo(Header)