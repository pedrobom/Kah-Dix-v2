import React, { useState } from 'react'
import './Score.css'


export default props =>
{
    const [players, setPlayer] = useState([
        {name: "Player 1", score: 20},
        {name: "Player 2", score: 16},
        {name: "Player 3", score: 2},
        {name: "Player 4", score: 90},
        {name: "Player 5", score: 40}
    ])
    
    const renderTable = () =>{
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Pontos</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        )
    }

    const renderRows = () =>{
        return players.map((player, index) => {
            return(
                <tr key={index}>
                    <td>{player.name}</td>
                    <td>{player.score}</td>
                </tr>
            )
        })
    }

    return(
        <aside className="players-nav-bar">
            {renderTable()}
        </aside>
    )
}
