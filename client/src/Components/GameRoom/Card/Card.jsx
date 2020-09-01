import React, { useEffect } from 'react'
import './Card.css'

export default props =>
{
    useEffect(() => {
        const cards = document.querySelectorAll('.card')

        cards.forEach( card => {
            // CLICOU NA CARTA
            card.addEventListener("mousedown", () => {
                card.classList.add("onMouseDown")
            })     
            
            // TDS AS POSSIBLIDADES DE SOLTAR O BOTÃO E ARRASTE
            card.addEventListener("mouseup", () => {
                card.classList.remove("onMouseDown")
            })
            card.addEventListener("mouseleave", () => {
                card.classList.remove("onMouseDown")
            })
            card.addEventListener("drop", () => {
                card.classList.remove("onMouseDown")
            })
            card.ondragstart = e => {
                console.log("Carta sendo arrastada")
                e.dataTransfer.setData('card-id', e.target.id)
            }
        })   
    }, [])

    return(      
        <img className="card" draggable="true"
            src={props.src} 
            alt={props.alt} 
            id={props.id}
        />       
    )
}