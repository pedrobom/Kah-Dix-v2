const Room = require('../models/Room')
const User = require('../models/User')
const RoomPlayer = require('../models/RoomPlayer')

module.exports = {

    async initAsync(roomName, user) {

        console.debug("\n############ NEW ROOM REQUEST: START ##############")

        try {

            console.log("Data received ", { roomName, user })
            const userId = user.id
            console.log("User id: ", userId)

            console.debug('Checking if room alread exists:')
            const existingRoom = await Room.findOne({
                where: { roomName: roomName }
            })

            if (existingRoom === null) {
                // console.debug('Checking if user alread in room')
                console.debug('Room does not exist yet!\nTrying to POST new room!')
                console.log("Passing data to create room: ", { roomName: roomName, hostId: userId })
                console.debug("Pushing user of id [%s] as host of [%s]", userId, roomName)
                const newRoom = await Room.create({ roomName: roomName, hostId: userId })

                console.debug("Creating roomPlayer and pushing roomId to it")
                const newPlayer = await RoomPlayer.create({
                    userId: userId,
                    roomId: newRoom.id
                })
                console.info('New Player Created: ', JSON.parse(JSON.stringify(newPlayer)))
                console.debug("############ NEW ROOM REQUEST: FINISHED #############\n")
                return newRoom

            } else {

                console.debug("Room alread exists!", existingRoom.toJSON())
                console.debug("Creating roomPlayer and pushing roomId to it")
                const newPlayer = await RoomPlayer.create({
                    userId: userId,
                    roomId: newRoom.id
                })
                console.info('New Player Created: ', JSON.parse(JSON.stringify(newPlayer)))
                console.debug("############ NEW ROOM REQUEST: FINISHED #############\n")
                return existingRoom
            }

        } catch (ex) {

            console.log("Error: ", ex.message)
            console.debug("############ NEW ROOM REQUEST: FINISHED ############\n")

        }
    },

    async getRoomOfUserAsync(user) {
        console.debug("\n######## GET ROOM OF USER REQUEST: START #########")

        try {

            console.log("Data received ", user)
            const userId = user.id

            console.debug("Trying to get ROOM of the User ", userId)
            const user = await User.findByPk(userId, {
                include: { association: 'player' }
            })

            const roomId = user.player.roomId

            if (roomId) {
                const room = await Room.findByPk(roomId, {
                    include: { association: 'players' }
                })
                console.log(JSON.parse(JSON.stringify(room)))
                console.debug("\n######## GET ROOM OF USER REQUEST: FINISHED ######")
                return JSON.parse(JSON.stringify(room))
            } else {
                throw new Error("User without room trying to access it")
            }

        } catch (ex) {
            console.log("Error: ", ex.message)
            console.debug("\n######## GET ROOM OF USER REQUEST: FINISHED ######")
        }

    },

    async getRoomDataAsync(data) {
        // const { room, player } = data

        return data
        // const roomData = {
        //     myUserName: player.user.name ,
        //     myHand: player.hand,
        //     haveIVoted: player.votedCard,
        //     mySelectedCard: player.mySelectedCard,
        //     name: room.name,
        //     state: room.state,
        //     turn: room.turn,
        //     currentPlayerIndex: room.currentPlayerIndex,
        //     host: room.host,
        //     prompt: room.prompt,
        //     selectedCardCount: room.selectedCardCount,
        //     results: room.results,
        //     victory: room.victory,
        //     isDeckDixit: room.isDeckDixit,
        //     isDeckEuro: room.isDeckEuro,
        //     isDeckNude: room.isDeckNude,
        //     isDeckPeq: room.isDeckPeq,
        //     votingCardsTurn: room.votingCardsTurn,
        //     players: room.players.map((player) => {
        //       return {
        //         name: player.user.name,
        //         id: player.user.id,
        //         score: player.score,
        //         selectedCard: room.state == Room.States.PICKING_PROMPT ? player.selectedCard : !!player.selectedCard,
        //         votedCard: room.state.PICKING_PROMPT ? player.votedCard : !!player.votedCard,
        //         isDisconnected: !player.user.socketIds.length
        //       }
        //     }),
        //     winner: room.winner,
        //   }
    },

    async startGameAsync(data) {
        console.log(data)
    }
}