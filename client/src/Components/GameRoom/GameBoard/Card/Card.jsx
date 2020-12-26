import React, { useEffect, useContext, useMemo } from 'react'
import { DragPreviewImage,useDrag } from 'react-dnd'
import GameContext from '../../GameContext/GameContext'
import './Card.css'
import { socket } from '../../../socket'
import Constants from '../../../../Constants'


function Card (props) {

			
    // Tirado daqui: https://react-dnd.github.io/react-dnd/docs/overview :)

    const {roomData} = useContext(GameContext)
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
                <div className='card-image-container' 
                    ref={canDrag ? drag : null}
                
                    onClick={(e) => { 
                        console.log("Clicked BUTTON")
                        e.preventDefault()
                        props.onClick && props.onClick(props.id) 
                        return false;
                        }}
                    onContextMenu={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        return false
                    }}
                        >
                    <img
                    style={isDragging && {"opacity": 0.5, "display": 'none' } || {} } 
                    
                        draggable={canDrag}
                        className={
                            "card "
                            + (props.class ? props.class + " " : "")
                            
                        }
                        src={props.src}
                        alt={props.alt}
                        id={props.id}
                    />
            </div>
         </div>    
        </>
}
export default Card
// export default DragSource(Constants.DragTypes.PICKING_CARD, cardSource, collect)(Card)