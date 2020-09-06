import React, { useContext } from 'react'
import './Header.css'
import { RoomContext } from '../GameRoom'


function Header () {
    const roomData = useContext(RoomContext)

    const openResults = e => {
        e.preventDefault()
        const resultsContainer = document.querySelector('.background-results')
        if(resultsContainer)resultsContainer.classList.toggle('results-hide')
    }
    return(  
        <React.Fragment>
            <header className="header">
                <div className="header-content-left">
                    <h3 className="logo">Jonarius-Dix!</h3>
                    <div className="header-links">
                        <a>Regras do jogo</a>
                        <a onClick={(e) => openResults(e)}>Último turno</a>             
                    </div> 
                </div>
                <div className="header-content-right">
                    <div className="header-links">
                        <a>Sobre os artistas</a>
                        <a>Seja um Colaborador</a>
                    </div>
                </div>
            </header>
             
        </React.Fragment>
 
    )
}

export default React.memo(Header)