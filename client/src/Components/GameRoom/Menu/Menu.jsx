import React from 'react'
import './Menu.css'

import menuScr from '../../../assets/images/menuIconScr'

export default props => 
{
    
    
    const expandMenu = e =>{
        e.preventDefault()
        const menuExpanded = document.querySelector('.ingame-menu-expanded')
        const menuIcon = document.querySelector('.ingame-menu-icon')
        menuExpanded.classList.remove('hide')
        menuExpanded.classList.add('show')

        menuIcon.classList.remove('show')
        menuIcon.classList.add('hide')
    }

    const closeMenu = e => {
        e.preventDefault()
        const menuExpanded = document.querySelector('.ingame-menu-expanded')
        const menuIcon = document.querySelector('.ingame-menu-icon')
        
        menuIcon.classList.remove('hide')
        menuIcon.classList.add('show')
        
        menuExpanded.classList.remove('show')
        menuExpanded.classList.add('hide')

    }

    return(
        <div className="ingame-menu" onClick={e => expandMenu(e)}>
            <img className="ingame-menu-icon show" src={menuScr}></img>
            <div className="ingame-menu-expanded hide">
                <a href="#">OPÇÃO1</a>
                <a href="#">OPÇÃO2</a>
                <a href="#">OPÇÃO3</a>
                <button onClick={e => closeMenu(e)}>[X]</button>
            </div>
        </div>
    )
}