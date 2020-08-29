import React, {useState, useEffect} from 'react'
import './InputPrompt.css'

export default function InputPrompt()
{
    const [input, setInput] = useState('')

    
    // ENVIAR UM SOCKET.EMIT PARA SER TRATADO NO SERVER!
    function submitPrompt(e){
        e.preventDefault()
        console.log(input)
    }

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