import React from 'react'
import './Hand.css'

export default props =>
{
    return(
        <div className="player-hand" dixit-drop-zone="drop">
            {props.children}
        </div>
    )
}