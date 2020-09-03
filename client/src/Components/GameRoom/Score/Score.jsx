import React, {  useContext } from 'react'
import './Score.css'
import { RoomContext } from '../GameRoom'
function Score() {
    const roomData = useContext(RoomContext)

    const sortPlayerByHightesScore = (a, b) => {
        if (a.score < b.score){
            return 1
        } else if (a.score > b.score){
            return -1
        } else {
            return 0
        }
    }

    const renderRows = () =>{ 
            // SCORE ESTÁ ALTERANDO A ORDEM DOS JOGADORES
            const playersSorted = roomData.players.sort(sortPlayerByHightesScore)
            return playersSorted.map((player, index) => {
            // console.log("playersSorted = ",playersSorted)
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
        </aside>
    )
}

export default React.memo(Score)
