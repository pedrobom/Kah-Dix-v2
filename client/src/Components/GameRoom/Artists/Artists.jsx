import React from 'react'
import './Artists.css'
import peqPicture from '../../../assets/images/peq.png'

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
        <p onClick={(e) => {expandArtists(e)}}>Sobre os Artistas</p>
        <div className="background-artists-button popup-container" >
            <div className="Artists-content popup-content">
                    <div className="artist-info">
                        <img className="artist-foto" src={peqPicture} alt="Peq"/>
                        <h2 className="artist-name">PEQ</h2>
                        <div className="artist-description">
                            Ian Raposo<br/>
                            Tamo Vivo - Rio de Janeiro<br/>
                            Produção @_lakermesse<br/>
                            O cara mais positivo que vc vai conhecer<br/>
                            Trabalhos disponíveis.</div>
                        <a className="artist-instagram" target='_blank' href="https://www.instagram.com/foda.se.o.peq/">@foda.se.o.peq</a>
                    </div>
                    <div className="be-part-info">
                        <div className="be-part-text">Participe também!</div>

                    </div>
                    <button className="popup-button" onClick={(e) => {closeArtists(e)}}>FECHAR</button>
            </div>       
        </div>           
        </>

    )     
}

export default React.memo(Artists)