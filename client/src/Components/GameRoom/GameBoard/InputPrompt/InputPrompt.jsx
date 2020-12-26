import React, {useState, useEffect, useContext} from 'react'
import './InputPrompt.css'
import { socket } from '../../../socket'

function InputPrompt() {

    const [input, setInput] = useState('')
    
    function submitPrompt(e){
        console.log("Usuário está enviando a frase!")
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
    
    return(
        <div className='gamePromptInputContainer'>
            <div className='gamePromptInputBox'>
                <div className='gamePromptInputMensagem'>Tá na sua vez de mandar a frase.. diz aí!</div>
                <form>
                    <input type="text" name="name" placeholder="Digita sua frase marota!"
                        onChange={e => setInput(e.target.value)}    
                        autoComplete='off'
                    /><br/>
                        <button onClick={e => submitPrompt(e)}>ENVIE</button>
                </form>
            </div>    
        </div>
    )
}

export default InputPrompt