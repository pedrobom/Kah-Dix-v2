import React from 'react'
import { socket } from '../../socket'


class HandTable extends React.Component {
    state = {
        hand: [],
    };

    componentDidMount() {
        socket.on('drawCards', cards => {
            this.setState({
            hand: cards,
            })
            
        })
        
    }
 
    

    renderCards = () => {
        const { hand } = this.state
        console.log(hand)
        return hand.map((card, index) => {
            return (
                <React.Fragment>
                    <div key={index}></div>
                    <div>{card}</div>   
                </React.Fragment>
                           
            )

        });

    }

    render() {
       return (
           <div>{this.renderCards()}</div>
    ) 
    }
    
}

export default HandTable