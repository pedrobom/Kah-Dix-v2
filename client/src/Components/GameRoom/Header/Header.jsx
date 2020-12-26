import React, { useContext } from 'react'
import './Header.css'
import GameContext from '../GameContext/GameContext'
import socket from '../../socket'
import Regras from '../Regras/Regras'
import Artists from '../Artists/Artists'


function Header (props) {
    const {roomData, setShouldShowTurnResults} = useContext(GameContext)

    const showLastTurnResults = () => {
        console.log("Mostrando resultados do ultimo turno!")
        setShouldShowTurnResults(true)
    }

    return(  
            <header className="header">
                <div className="header-content-left">
                    <h3 className="logo">Jonarius</h3>
                </div>
                <div className="header-content-right">
                    <div className="header-links">
                    { (roomData.turn > 1) ? (<><p onClick={showLastTurnResults}>Ver Último turno</p></>) : null}
                        <Regras />
                        <Artists />
                        <p>Seja um Colaborador</p>
                    </div>
                </div>
            </header>
    )
}

export default React.memo(Header)