import React, {useState, useContext } from 'react'
import './VictorySelector.css'

function VictorySelector (){
    const [victoryConditions, setVictory] = useState("")
    console.log('victoryConditions', victoryConditions)

    return (
    <div id="victory-conditions">
        <h2>Condições de glória</h2>
            <div className="victory-input">
                <input
                name="victory"
                type="radio"
                value="points-victory"
                onChange={(e) => {
                    if(e.target.checked){
                    const value = e.target.value
                    setVictory(value)                                
                    }
                }}/><h3>Corrida dos 30 pontos</h3></div>
            <div className="victory-input">
                <input
                name="victory"
                type="radio"
                value="deck-victory"
                onChange={(e) => {
                    if(e.target.checked){
                        const value = e.target.value
                        setVictory(value)                                
                        }
                }}/><h3>Jogar até o baralho acabar</h3></div>
    </div>
    )     
}

export default React.memo(VictorySelector)