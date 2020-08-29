import React, { useState, useEffect } from 'react'
import './Score.css'
import { socket } from '../../socket'


export default function Score({roomData}) {

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
        if(roomData){
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
