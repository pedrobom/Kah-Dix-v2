import React, {useState, useEffect} from 'react'
import './InputPrompt.css'
import { socket } from '../../socket'

export default function InputPrompt({roomData})
{
    const [input, setInput] = useState('')
    const [trigger, setTrigger] = useState(false)

    useEffect(() =>{
        socket.on('dispararInputPOPUP',() =>{
            setTrigger(true)
            console.log('dispararInputPOPUP')
        })
    })
    
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
    const renderPrompt = (roomData) =>{
        if(trigger == true) {
            if(roomData.myUserName == roomData.players[roomData.currentPlayerIndex]){
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
    }
    
    return(
        <>
            {renderPrompt(roomData)} 
        </>  
    )
}