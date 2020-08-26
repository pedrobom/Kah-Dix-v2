import React from 'react'
import './Card.css'
import cardBack from '../../../assets/cardImgs/cardback.png'

export default props =>
{
    return(        
        props.hidden 
        ? <img className="card" src={cardBack} alt={props.alt}/>
        : <img className="card" src={props.src} alt={props.alt}/>       
    )
}