import React from 'react'
import './Header.css'

function Header () {

    return(  
        <React.Fragment>
            <header className="header">
                <div className="header-content-left">
                    <h3 className="logo">Kah-Dix!</h3>
                    <div className="header-links">
                        <a>Regras do jogo</a>
                        <a>Último turno</a>             
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