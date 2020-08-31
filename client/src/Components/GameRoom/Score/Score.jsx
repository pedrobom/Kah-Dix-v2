import React, { useState, useEffect, useContext } from 'react'
import './Score.css'
import { socket } from '../../socket'
import { RoomContext } from '../GameRoom'
export default function Score() {
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
