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
                console.log('props.alt = ', props.alt)
                if (roomData.state === "VOTING" && props.class == `votingCards ${props.id}` ){
                    console.log('Jogador tentou votar na carta: ', props.id)

                        socket.emit('voteCard', props.id, (error) => {
                            if(error !== "Carta Votada") {
                               return alert(error) 
                            } 
                            else {
                                let ele = document.querySelector(`.${props.id}`)
                                if(ele !== null)                           
                                ele.classList.add("votedCard")   
                            }
                        })
                      
                    
                }
                
            }} 
        />       
    )
}

export default React.memo(Card)