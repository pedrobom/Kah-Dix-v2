import React from 'react'
import './Artists.css'

function  Artists () {
    const expandArtists = e =>{
        e.preventDefault()
        const artistsExpanded = document.querySelector('.background-artists-button')
        
        artistsExpanded.style.display = "flex"

        artistsExpanded.classList.remove('hide')
        artistsExpanded.classList.add('show')
    }

    const closeArtists = e => {
        e.preventDefault()
        const artistsExpanded = document.querySelector('.background-artists-button')
        
        artistsExpanded.style.display = "none"
        artistsExpanded.classList.remove('show')
        artistsExpanded.classList.add('hide')

    }

    return (
        <>
        <a onClick={(e) => {expandArtists(e)}}>Sobre os Artistas</a>
        <div className="background-artists-button">
            <div className="Artists-content">
                    <a>SOBRE O PEQ</a>
                    <button onClick={(e) => {closeArtists(e)}}>FECHAR</button>
            </div>       
        </div>           
        </>

    )     
}

export default React.memo(Artists)