
import React from 'react'
import Constants from '../../Constants'
import { usePreview } from 'react-dnd-preview';
import { getCardInfo } from '../allCards' 

export default () => {
    const {display, itemType, item, style} = usePreview();
    if (!display) {
      return null;
    }

    
    if (itemType == Constants.DragTypes.PICKING_CARD) {
        console.log("Renderizando drag preview para carta [%o]", item)
        let carInfo = getCardInfo(item.id)
        return <div class="card card-dragging-preview" style={style}>
            <img
                src={carInfo.src}
                />
        </div>;
    }
    return null
  };