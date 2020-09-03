import React, {useState, useEffect, useContext} from 'react'
import './InputPrompt.css'
import { socket } from '../../socket'
import { RoomContext }  from '../GameRoom'

function InputPrompt() {

    const roomData = useContext(RoomContext)
    const [input, setInput] = useState('')
    
    function submitPrompt(e){
        e.preventDefault()
        console.log(input)
        if(input !== ""){
            socket.emit("pickPrompt", input, (error) =>{
                if(error){
                    alert(error)
                } 
            })
            setInput('')
        }
        else {
            alert("POR FAVOR, DIGITE UM PROMPT!")
        }
    }
    const renderPrompt = () =>{
        console.log('é a vez do [%s] escolher a frase',roomData.players[roomData.currentPlayerIndex].name)
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
    
    return(
        <>
            {renderPrompt()} 
        </>  
    )
}

export default InputPrompt