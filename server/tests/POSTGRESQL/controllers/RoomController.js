const Room = require('../models/Room')
const User = require('../models/User')
const Socket = require('../models/Socket')
const { getRoomDataForPlayer } = require('../../../src/lib/services/rooms')

module.exports = {

    async init(data) {

        console.debug("\n############ NEW ROOM REQUEST: START ##############")

        try {

            const { roomName, socketId } = data
            console.log("Data received ", { roomName, socketId })
            console.debug("Trying to get id user of socket.id ", socketId)
            const userId = await User.findOne({
                where: { socketId: socketId },
                attributes: ['id']
            }).then(id => id.get('id'))
            console.log("User id: ", userId)

            console.debug('Checking if room alread exists:')
            const existingRoom = await Room.findOne({
                where: { roomName: roomName }
            })

            if (existingRoom === null) {
                // console.debug('Checking if user alread in room')
                console.debug('Room does not exist yet!\nTrying to POST new room!')
                console.debug('Destructure input\nAwaiting connection with database...')

                console.log("Passing data to create room: ", { roomName: roomName, hostId: userId })
                console.debug("Pushing user of socket.id [%s] as host", socketId)
                const newRoom = await Room.create({ roomName: roomName, hostId: userId })

                console.debug("Pushing roomId to user of id [%s]", userId)
                await User.update(
                    {
                        roomId: newRoom["id"]
                    },
                    {
                        where: { id: userId }
                    }
                )
                console.debug("############ NEW ROOM REQUEST: FINISHED #############\n")
                return newRoom

            } else {

                console.debug("Room alread exists!", existingRoom.toJSON())
                console.debug("Pushing user of id ", userId)
                await User.update(
                    {
                        roomId: existingRoom["id"]
                    },
                    {
                        where: { id: userId }
                    }
                )
                console.debug("############ NEW ROOM REQUEST: FINISHED #############\n")
                return existingRoom
            }

        } catch (ex) {

            console.log("Error: ", ex.message)
            console.debug("############ NEW ROOM REQUEST: FINISHED ############\n")

        }
    },

    async getRoomOfUser(user) {
        console.debug("\n######## GET ROOM OF USER REQUEST: START #########")

        try {

            console.log("Data received ", user)
            const userId = user.id

            console.debug("Trying to get ROOM of the User ", userId)
            const roomId = await User.findByPk(userId, {
                attributes: ['roomId']
            }).then(roomId => roomId.get('roomId'))

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

    async getRoomData(data) {
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
    }
}