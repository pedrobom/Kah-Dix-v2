import React, { useEffect, useContext } from 'react'
import{ RoomContext } from '../GameRoom'
import './Card.css'
import { socket } from '../../socket'

export default props =>
{
    const roomData = useContext(RoomContext)
    
    useEffect(() => {
        const cards = document.querySelectorAll('.card')

        if (roomData.state === "SELECTING_CARDS"){

            cards.forEach( card => {
                card.classList.add("selectingCards")

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
        } 

    }, [roomData])


    // const voteCard = (e) => {
    //     e.preventDefault()
    //     console.log('Jogador votou na carta: ', cardInfo)
    //     socket.emit('voteCard', cardInfo, (error) =>{ 
    //         if(error){
    //            alert(error)
    //         } 
    //     })
    // }


    return(      
        <img className={`card ${props.classExtra}`} draggable="true"
            src={props.src} 
            alt={props.alt} 
            id={props.id}
            onClick={e => {
                e.preventDefault()
                if (roomData.state === "VOTING" && props.classExtra == 'votingCards' ){
                    console.log('Jogador votou na carta: ', props.id)
                    
                    // if props.id IS NOT equal to selectedCard, do: ( !== )
                    if( props.id !== roomData.mySelectedCard){
                        console.log('props.id', props.id)
                        console.log(roomData.mySelectedCard)
                        socket.emit('voteCard', props.id, (error) => { 
                            if(error) alert(error) 
                        })                        
                    }
                    else{
                        alert('Você não pode votar na sua própria carta! DUH')
                    }
                }
                
            }} 
        />       
    )
}