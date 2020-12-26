import React, {useState, useContext } from 'react'
import './DeckSelector.css'
import GameContext from '../../GameContext/GameContext'
import SessionContext from '../../../SessionContext'


function DeckSelector (){
    console.log('renderizando Componente DeckSelector')
    const {roomData, amIHost} = useContext(GameContext)
    const [isDeckPeq, setDeckPeq] = useState(false)
    const [isDeckDixit, setDeckDixit] = useState(false)

    const { session, setSession } = useContext(SessionContext)


    console.log('isDeckDixit', isDeckDixit)
    console.log('isDeckPeq', isDeckPeq)

    return (
        <div id="build-deck">
            <h2>Seu Baralho é do caralho!</h2>
            {(amIHost) ? (<><div className="deck-input"><input
            name="Deck do Peq"
            type="checkbox"
            onChange={(e) => {
                let checked=e.target.checked;
                setDeckPeq(checked)
            }}/><h3>Cartas do Peq</h3></div></>) : null}
            {(amIHost) ? (<><div className="deck-input"><input
            name="Deck de Dixit"
            type="checkbox"
            onChange={(e) => {
                let checked=e.target.checked;
                setDeckDixit(checked)
            }}/><h3>Cartas de Dixit</h3></div></>) : null}
        </div>
    )     
}

export default React.memo(DeckSelector)