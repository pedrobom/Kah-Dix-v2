module.exports = {
    state: "BEGIN",
    transitions: {
        BEGIN: {
            debug: function(message = "LOG MESSAGE:"){ 
                console.debug(message)
                console.debug("Current State: [%s]", this.state)
                this.changeState("PLAYER_TURN")
            }
        },
        PLAYER_TURN: {
            debug: function(message = "LOG MESSAGE:"){ 
                console.debug(message)
                console.debug("Current State: [%s]", this.state)
                this.changeState('OTHERS_TURN')
            }
        },
        OTHERS_TURN: {
            debug: function(message = "LOG MESSAGE:"){ 
                console.debug(message)
                console.debug("Current State: [%s]", this.state)
                this.changeState('VOTE_TURN')
            }
        },
        VOTE_TURN: {
            debug: function(message = "LOG MESSAGE:"){ 
                console.debug(message)
                console.debug("Current State: [%s]", this.state)
                this.changeState('RESULTS')
            }
        },
        RESULTS: {
            debug: function(message = "LOG MESSAGE:"){ 
                console.debug(message)
                console.debug("Current State: [%s]", this.state)
                this.changeState('GAME_OVER')
            }
        },
        GAME_OVER: {
            debug: function(message = "LOG MESSAGE:"){ 
                console.debug(message)
                console.debug("Current State: [%s]", this.state)
                this.changeState('BEGIN')
            }
        }
    },
    dispatch(actionName, ...payload){
        const actions = this.transitions[this.state]
        const action = this.transitions[this.state][actionName]

        if(action){
            action.apply(this, ...payload)
        } else {
            return `${this.state} does not have this action!`
        }
    },
    changeState(newState){
        if(newState in this.transitions){
            console.debug("Going to: [" + newState + "]\n")
            this.state = newState
        }
        else {
            console.info("NOT A VALID STATE!")
            console.info("LIST OF STATES IN THIS FINITE STATE MACHINE:")
            console.info(Object.keys(this.transitions))
        }
    },
}


// USAGE EXEMPLES
// let GameExemple = Object.create(stateMachine, {
//     name: {
//         writable: false,
//         enumerable: true,
//         value: "Game Exemplo Object"
//     }
// })

// GameExemple.dispatch("debug", [])
// GameExemple.dispatch("debug", [])
// GameExemple.dispatch("debug", [])
// GameExemple.dispatch("debug", [])
// GameExemple.dispatch("debug", [])
// GameExemple.dispatch("debug", [])
// GameExemple.dispatch("debug", [])

// GameExemple.changeState("NON_EXISTING_STATE")

// module.exports.StateMachine = Object.create(stateMachine, {
//         name: {
//             writable: false,
//             enumerable: true,
//             value: "Dixit State Machine"
//         }
//     })