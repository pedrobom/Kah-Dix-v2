import React, { useState, useEffect } from 'react'
import './Score.css'
import { socket } from '../../socket'


export default props =>
{
    // state de jogadores,
    // atualizar pelas props!
    const [players, setPlayer] = useState([])
        // {name: "Lululu", score: 20},
        // {name: "Marchola", score: 16},
        // {name: "Snades", score: 2},
        // {name: "Maxu", score: 90},
        // {name: "Jonarios", score: 40},
        // {name: "Pim", score: 40}
    

    useEffect(() => {
        socket.on('getScore', (players) => {
            console.log('socket.on("getScore") - setPlayers()')
            setPlayer(players)

        })
        console.log(players)
    }, [])

    useEffect(() => {
        //efeito a cada vez que "player" é atualizado
    }, [players])

    const sortPlayerByHightesScore = (a, b) => {
        if (a.score < b.score){
            return 1
        } else if (a.score > b.score){
            return -1
        } else {
            return 0
        }
    }
    
    const renderTable = () =>{
        return(
            <table className="fl-table">
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
        const playersSorted = players.sort(sortPlayerByHightesScore)
        return playersSorted.map((player, index) => {
           // console.log("playersSorted = ",playersSorted)
            console.log(".map ((player))  player = ",player)
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
