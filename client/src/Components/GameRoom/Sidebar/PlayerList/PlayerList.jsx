
import React, {  useContext } from 'react'

import './PlayerList.css'
import GameContext from '../../GameContext/GameContext'
import SessionContext from '../../../SessionContext'
import Constants from '../../../../Constants'

export default React.memo(function PlayerList() {
    const {roomData} = useContext(GameContext)
    const { session } = useContext(SessionContext)

    const renderRows = () =>{ 

        var currentPlayer = roomData.players[roomData.currentPlayerIndex]
        console.debug("Renderizando lista de jogadores na sala com estado [%s].. jogador atual:", roomData.state, currentPlayer)
        
        return roomData.players.map((player, index) => {

            let isSessionPlayer = session && session.user && session.user.id == player.id
            let isHostPlayer = player.id == roomData.host.id
            let isDisconnected = player.isDisconnected
            let isCurrentPlayer = currentPlayer.id == player.id

            // Vamos indicar o que o jogador precisa fazer nesse estado..
            var playerStateIcon = ''
            var playerStateClass = ''
            switch(roomData.state) {
                case Constants.RoomStates.PICKING_PROMPT:
                    if (player.id == currentPlayer.id) {
                        playerStateClass = 'pickingPrompt'
                        playerStateIcon = <i className='fas fa-pencil-alt'></i>
                    }
                    break;
                // Caso seja a hora de escolher carta , todo mundo mostra o estado: está escolhendo ou já escolheu
                // menos o jogador do turno :)
                case Constants.RoomStates.SELECTING_CARDS:
                    playerStateClass = player.selectedCard ? 'cardSelected' : 'selectingCard'
                    playerStateIcon = player.selectedCard ? <i className='fas fa-check' title='Já escolheu a carta'></i> : <i className='fas fa-question' title='Tá escolheno a carta'></i>
                    break;
                // Caso seja a hora de votar uma carta , todo mundo mostra o estado: está votando ou já votou
                // menos o jogador do turno :)
                case Constants.RoomStates.VOTING:
                    if (player.id != currentPlayer.id) {
                        playerStateClass = player.votedCard ? 'cardVoted' : 'votingCard'
                        playerStateIcon = player.votedCard ? <i className='fas fa-check' title='Já votou :)'></i> : <i className='fas fa-question' title='Tá votano!'></i>
                    }
                    break;

            }

            console.debug("Comparando currentPlayer", session && session.user, player)
            console.debug("Jogador [%s], é jogador atual: %s, esta desconectado: %s, é o host: %s, estado: %s, icone: %s", player, isSessionPlayer, isDisconnected, isHostPlayer, playerStateClass, playerStateIcon)

            return <tr key={index} className={'player ' + (isSessionPlayer ? "thisIsMe " : "") + (isDisconnected ? 'disconnected': '')}>
                <td className='playerName'>
                    { isCurrentPlayer ? <i title='É o turno dessa pessoa escolher a frase :)' className='fas currentPlayerIcon fa-pencil-alt'></i> : ''}
                    <span className='name'>{player.name} </span>
                    { isSessionPlayer ? <i title='Esse/a é você :)' className='fas sessionPlayerIcon fa-user'></i> : ''}
                    { isHostPlayer ? <i title='Essa pessoa aqui é dona da sala.. fica esprt' className='fas hostPlayerIcon fa-star'></i> : ''}
                    { isDisconnected ? <i title='Essa pessoa foi dar um pulo no banheiro e já volta' className='fas playerDisconnectedIcon fa-toilet-paper'></i> : ''}
                </td>
                <td className='playerScore'>{player.score}</td>
                <td className={'playerStatus ' + playerStateClass}>
                    {playerStateIcon}
                </td>
            </tr>
            // console.log("playersSorted = ",playersSorted)
            // if(player.name == roomData.players[roomData.currentPlayerIndex].name)
            //     return(
            //         <tr key={index}>
            //             {/* ADICIONAR NOME DO JOGADOR EM NEGRITO */}
            //             <td>{player.name}</td>
            //             <td>{player.score}</td>
            //         </tr>
            //     )
            // else {
            //     return (
            //         <tr key={index}>
            //             <td>{player.name}</td>
            //             <td>{player.score}</td>
            //         </tr>                    
            //     )
            // }
        })            
    }

    return(
        <div className="playerList">
            <table>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </div>
    )
})
