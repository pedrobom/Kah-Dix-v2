import React, { useState, useEffect, useContext, useMemo } from 'react'
import socket from "../../socket"
import SessionContext from "../../SessionContext"
import Constants from "../../../Constants"

// Contexto do jogo em React
const GameContext = React.createContext()
export default GameContext

// Contexto do jogo, com as variáveis que são úteis para todos
// os componentes do jogo :)
export const GameContextProvider = ({children}) => {

    // Precisamos muito usar o contexto de ssessao para pegar todos os dados
    const { session } = useContext(SessionContext)
    
    // Efeitos para buscar informações no servidor e escutar coisas da sala
    const [roomDataFromEvent, setRoomDataFromEvent] = useState()
    useEffect(() => {

        // Carregar os dados
        console.log("Carregando os dados da sala no GameContext e escutando mudança de dados da sala!")

        // Escutando dados da sala
        let onRoomData = (roomData) => {
            console.log("socket.on('roomData') = ", roomData)
            setRoomDataFromEvent(roomData)
        }
        socket.addEventListener('roomData', onRoomData)

        return () => {
            console.log('Cleanup of GameContext')
            socket.removeListener('roomData', onRoomData)
        }

    }, [])

    // O roomData pode vir da sessão ou dos eventos de roomData :).. os eventos de roomData
    // devem ser mais atualizados
    var roomData = useMemo(() => roomDataFromEvent || (session && session.roomData), [session, roomDataFromEvent])

    var myPlayer = useMemo(() => roomData && roomData.players.find((player) => player.id == session.user.id))
    var currentPlayer = useMemo(() => roomData && roomData.players[roomData.currentPlayerIndex])

    var amIPickingPrompt = useMemo(() => roomData && currentPlayer.id == myPlayer.id && roomData.state == Constants.RoomStates.PICKING_PROMPT)
    var amICurrentPlayer = useMemo(() => roomData && currentPlayer.id == myPlayer.id)

    var amIHost = useMemo(() => roomData && (roomData.host.id == session.user.id))
    var myVotedCard = useMemo(() => roomData && roomData.haveIVoted)

    // Objetos disponíveis no GameContext :)
    const context = {
        amIPickingPrompt,
        roomData,
        amICurrentPlayer,
        currentPlayer,
        myPlayer,
        amIHost ,
        myVotedCard
    }

    return <GameContext.Provider value={context}>{children}</GameContext.Provider>


}