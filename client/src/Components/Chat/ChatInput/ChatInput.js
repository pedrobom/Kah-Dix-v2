
    import React from 'react';
    import './ChatInput.css';

    
    
    const Input = ({message, setMessage, sendMessage}) => (


        <form className='chat-form'>
            <input 
                className='input'
                type='text'
                placeholder='Diz aí...'
                value={message}
                onChange={(event) => setMessage(event.target.value)} 
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} />
            <button className="sendButton" onClick={(event) => sendMessage(event)}>Lança</button>
        </form>
    );
    
    export default React.memo(Input);
