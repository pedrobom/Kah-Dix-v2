import React, { useEffect } from 'react'
import './Card.css'

export default props =>
{
    useEffect(() => {
        const cards = document.querySelectorAll('.card')

        cards.forEach( card =>{
            card.addEventListener("mousedown", () => {
                card.classList.add("onMouseDown")
            })     
            
            card.addEventListener("mouseup", () => {
                card.classList.remove("onMouseDown")
            }) 
        })
        

    }, [])

    return(      
        <img className="card" src={props.src} alt={props.alt} draggable={true}/>       
    )
}