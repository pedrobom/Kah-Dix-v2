import React from 'react'
import './Header.css'

function Header () {

    return(  
        <React.Fragment>
            <header className="header">
                <div className="logo"> Kah-Dix! </div>
                <div className="headerLinks">Regras do jogo</div>
                <div className="headerLinks">Sobre os artistas</div>
                <div className="headerLinks">Seja um colaborador</div>                  
            </header>
             
        </React.Fragment>
 
    )
}

export default React.memo(Header)