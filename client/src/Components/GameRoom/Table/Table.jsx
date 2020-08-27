import React from 'react'
import './Table.css'

export default props =>
{
    return(
        <div className="dealer-table" dixit-drop-zone="drop">
            {props.children}
        </div>
    )
}