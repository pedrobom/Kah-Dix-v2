import React, { useState, useEffect } from 'react'
import { socket } from '../../socket'


const HandTable = () => {
    const [hand, setHand] = useState([])

    useEffect(() => {
        socket.on('drawCards', cards => {
            setHand({
            hand: cards,
            })
            
        })     
    },[hand])
 
    

    const renderCards = () => {
        const { hand } = hand
        console.log(`cartas distribuidas: ${hand}`)
        return hand.map((card, index) => {
            return (
                <React.Fragment>
                    <div key={index}></div>
                    <div>{card}</div>   
                </React.Fragment>
                           
            )

        });

    }

    return (
           <div></div>
    ) 
    
    

}

export default HandTable