import React, { useEffect, useContext, useMemo } from 'react'
import { DragPreviewImage,useDrag } from 'react-dnd'
import{ RoomContext } from '../../GameRoom'
import './Card.css'
import { socket } from '../../../socket'
import Constants from '../../../../Constants'


function Card (props) {

			
    // Tirado daqui: https://react-dnd.github.io/react-dnd/docs/overview :)

    const roomData = useContext(RoomContext)
    const canDrag = useMemo(() => props.type == "hand" && roomData.state == Constants.RoomStates.SELECTING_CARDS)

    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: Constants.DragTypes.PICKING_CARD, id: props.id },
        canDrag: canDrag,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),
    });

    return <>
            <div className={'card-container '} >
                <img
                style={isDragging && {"opacity": 0.5, "display": 'none' } || {} } 
                ref={canDrag ? drag : null}
                    draggable={canDrag}
                    className={
                        "card "
                        + (props.class ? props.class + " " : "")
                        
                    }
                    src={props.src}
                    alt={props.alt}
                    id={props.id}
                    onClick={() => { props.onSelect && props.onSelect() }}
                    onContextMenu={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        return false
                    }}
                />
         </div>    
        </>
}
export default Card
// export default DragSource(Constants.DragTypes.PICKING_CARD, cardSource, collect)(Card)