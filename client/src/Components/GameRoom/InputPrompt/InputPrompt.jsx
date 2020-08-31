import React, {useState, useEffect, useContext} from 'react'
import './InputPrompt.css'
import { socket } from '../../socket'
import { RoomContext }  from '../GameRoom'

export default function InputPrompt() {

    const roomData = useContext(RoomContext)
    const [input, setInput] = useState('')
    // const [trigger, setTrigger] = useState(false)

    // useEffect(() =>{
    //     socket.on('dispararInputPOPUP',() =>{
    //         setTrigger(true)
    //         console.log('dispararInputPOPUP if isCurrentPlayer')
    //     })
    // },[trigger])
    
    // ENVIAR UM SOCKET.EMIT PARA SER TRATADO NO SERVER!
    function submitPrompt(e){
        e.preventDefault()
        console.log(input)
        if(input !== ""){
            socket.emit("input", input)
        }
        else {
            alert("POR FAVOR, DIGITE UM PROMPT!")
        }
    }
    const renderPrompt = (roomData = null) =>{
            
            if(roomData !== null){
            console.log('currentplayer....name',roomData.players[roomData.currentPlayerIndex].name)
                if(roomData.myUserName === roomData.players[roomData.currentPlayerIndex].name){
                    return(
                        <React.Fragment>    
                            <div className="background-shadow-form"></div>
                            <form className="in-game-form">
                                <input type="text" name="name" placeholder="Digita sua frase marota!"
                                    onChange={e => setInput(e.target.value)}    
                                />
                                <button onClick={e => submitPrompt(e)}>ENVIE</button>
                            </form>
                        </React.Fragment>
                    ) 
                }            
            }
            else {
                console.log("Ainda não chegou props 'roomData'")
            }
        
    }
    
    return(
        <>
            {renderPrompt(roomData)} 
        </>  
    )
}