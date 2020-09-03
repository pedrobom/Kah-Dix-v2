import React, { useEffect, useContext } from 'react'
import{ RoomContext } from '../GameRoom'
import './Card.css'
import { socket } from '../../socket'

function Card (props) {
    const roomData = useContext(RoomContext)

    return(      
        <img 
            className={
                (props.class !== "" || props.class !== null) 
                    ? `card ${props.class}` 
                    : "card"
                }

            draggable={
                roomData.state === "SELECTING_CARDS"
                ? "true"
                : "false"
            }
            src={props.src} 
            alt={props.alt} 
            id={props.id}
            onClick={e => {
                e.preventDefault()
                if (roomData.state === "VOTING" && props.class == 'votingCards' ){
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

export default React.memo(Card)