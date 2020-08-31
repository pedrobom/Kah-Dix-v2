import React from 'react'
import './Menu.css'

import menuScr from '../../../assets/images/menuIconScr'

export default props => 
{
    
    
    const expandMenu = e =>{
        e.preventDefault()
        const menuExpanded = document.querySelector('.ingame-menu-expanded')
        const menuIcon = document.querySelector('.ingame-menu-icon')
        
        menuIcon.style.display = "none"
        menuExpanded.style.display = "flex"

        menuExpanded.classList.remove('hide')
        menuExpanded.classList.add('show')

        menuIcon.classList.remove('show')
        menuIcon.classList.add('hide')
    }

    const closeMenu = e => {
        e.preventDefault()
        const menuExpanded = document.querySelector('.ingame-menu-expanded')
        const menuIcon = document.querySelector('.ingame-menu-icon')
        
        menuIcon.style.display = "block"
        menuExpanded.style.display = "none"

        menuIcon.classList.remove('hide')
        menuIcon.classList.add('show')
        
        menuExpanded.classList.remove('show')
        menuExpanded.classList.add('hide')

    }

    return(
        <div className="ingame-menu">
            <img className="ingame-menu-icon show" src={menuScr} onClick={e => expandMenu(e)}></img>
            <div className="ingame-menu-expanded hide">
                <ul>
                    <li>
                        <span>Sobre os artistas</span>
                        <span>(ação da opção1)</span>
                    </li>
                    <li>
                        <span>Tutorial</span>
                        <span>(ação da opção2)</span>
                    </li>
                    <li>
                        <span>OPÇÃO3</span>
                        <span>(ação da opção3)</span>
                    </li>
                    <li>
                        <span>OPÇÃO4</span>
                        <span>(ação da opção4)</span>
                    </li>
                    <li><button onClick={closeMenu}>[X]</button></li>
                </ul>
                
            </div>
        </div>
    )
}