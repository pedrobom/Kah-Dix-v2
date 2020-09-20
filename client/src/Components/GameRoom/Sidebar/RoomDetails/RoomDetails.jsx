
import React, {  useContext } from 'react'

import './RoomDetails.css'
import { RoomContext } from '../../GameRoom'

export default React.memo(function RoomDetails() {
    const roomData = useContext(RoomContext)

    return(
        <div className="roomDetails">
            <div className="roomName">
                Sala: <span>{ roomData.name }</span>
            </div>
            <div className="roomControls">
                <a>detalhes</a><br/>
                <a>sair</a>
            </div>
        </div>
    )
})
