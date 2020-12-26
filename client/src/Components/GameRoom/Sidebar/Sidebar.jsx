import React, {  useContext } from 'react'
import Chat from './Chat/Chat'
import PlayerList from './PlayerList/PlayerList'
import './Sidebar.css'
import RoomDetails from './RoomDetails/RoomDetails'

export default React.memo(function Sidebar() {

    return(
        <aside className="sidebar">
            <RoomDetails></RoomDetails>
            <PlayerList></PlayerList>
            <Chat></Chat>
        </aside>
    )
})
