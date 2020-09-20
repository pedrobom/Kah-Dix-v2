import React, {  useContext } from 'react'
import Chat from './Chat/Chat'
import PlayerList from './PlayerList/PlayerList'
import './Sidebar.css'
import { RoomContext } from '../GameRoom'
import RoomDetails from './RoomDetails/RoomDetails'

export default React.memo(function Sidebar() {

    const roomData = useContext(RoomContext)

    return(
        <aside className="sidebar">
            <RoomDetails></RoomDetails>
            <PlayerList></PlayerList>
            <Chat></Chat>
        </aside>
    )
})
