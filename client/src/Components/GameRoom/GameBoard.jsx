import React, { useState, useEffect, useContext, useMemo } from "react";

import Prompt from './Prompt/Prompt'
import Hand from './Hand/Hand'
import Table from './Table/Table'

import SessionContext from "../SessionContext"

import { RoomContext } from './GameRoom'

// Esse é um componente que representa a área jogável do jogo (e.g., escolher carta, votar, etc)
export default () => {   

    const roomData = useContext(RoomContext)
    const { session } = useContext(SessionContext)

    console.debug("Rendering GameBoard! %s")    

    return (
        <div className="gameBoard">
            {roomData.prompt !== null
            ? <Prompt prompt={`${roomData.players[roomData.currentPlayerIndex].name} diz: ${roomData.prompt}`} />
            : <Prompt prompt={`Esperando ${roomData.players[roomData.currentPlayerIndex].name} mandar aquele bordão solerte`} 
            />}
            <Table canDrop={"true"}/>
            <Hand />
        </div>
    )        


}
