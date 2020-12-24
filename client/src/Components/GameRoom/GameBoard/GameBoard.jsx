import React, { useState, useEffect, useContext, useMemo } from "react";

import Hand from './Hand/Hand'
import Table from './Table/Table'
import InputPrompt from './InputPrompt/InputPrompt'
import TurnResults from '../TurnResults/TurnResults'

import './GameBoard.css'
import SessionContext from "../../SessionContext"

import { RoomContext } from '../GameRoom'
import GameBoardHeader from "./GameBoardHeader/GameBoardHeader";
import Constants from '../../../Constants'

// Esse é um componente que representa a área jogável do jogo (e.g., escolher carta, votar, etc)
export default () => {   

    const roomData = useContext(RoomContext)
    const { session } = useContext(SessionContext)
    const [lastTurnResultViewed, setLastTurnResultViewed] = useState(0)

    var myPlayer = useMemo(() => roomData.players.find((player) => player.id == session.user.id))
    var currentPlayer = useMemo(() => roomData.players[roomData.currentPlayerIndex])
    var amIPickingPrompt = useMemo(() => currentPlayer.id == myPlayer.id && roomData.state == Constants.RoomStates.PICKING_PROMPT)
    
    // Devemos mostrar os resultados? Só se o usuário ainda não viu o resultado :)
    var shouldShowTurnResult = useMemo(() => lastTurnResultViewed < roomData.turn && (roomData.state === Constants.RoomStates.PICKING_PROMPT && roomData.turn > 1 && roomData.results))

    const resultsViewedCallback = () => {
        console.log("Usuário viu os resultados e fechou  tela :)")
        setLastTurnResultViewed(roomData.turn)
    }

    console.debug("Rendering GameBoard! %s")   
    
    

    return (
        <div className="gameBoard-container">
                {
                    shouldShowTurnResult ? <TurnResults resultsViewedCallback={resultsViewedCallback} />
                    :
                    
                    <div className={"gameBoard " + (amIPickingPrompt ? 'iAmPickingPrompt' : '')}>
                            <GameBoardHeader></GameBoardHeader>
                            <Table canDrop={roomData.state !== Constants.RoomStates.PICKING_PROMPT}/>
                            <Hand />
                    </div>
                }
        </div>
    )        


}
