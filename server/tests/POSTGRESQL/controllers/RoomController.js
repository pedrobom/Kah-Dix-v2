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

    async getPlayersInRoom(data) {
        console.debug("\n######## GET PLAYERS IN ROOM REQUEST: START #########")

        try {

            const { roomName } = data
            console.log("Data received ", { roomName })
            console.debug("Trying to get players from room [%s] ", roomName)

            const roomId = await Room.findOne({
                where: { roomName: roomName },
                attributes: ['id']
            }).then(id => id.get('id'))

            const room = await Room.findByPk(roomId, {
                include: { association: 'players' }
            })
            console.debug("Players in room [%s]: ", roomName)
            console.debug(JSON.parse(JSON.stringify(room["players"])))

            console.debug("\n######## GET PLAYERS IN ROOM REQUEST: FINISHED ###")
            return JSON.parse(JSON.stringify(room["players"]))

        } catch (ex) {
            console.log("Error: ", ex.message)
            console.debug("\n######## GET PLAYERS IN ROOM REQUEST: FINISHED ###")
        }
    },

    async getRoomOfUser(data) {
        console.debug("\n######## GET PLAYER IN ROOM REQUEST: START #########")

        try {

            const { socketId } = data
            console.log("Data received ", { socketId })
            console.debug("Trying to get id of the USER who have this socket!")
            const userId = await Socket.findOne({
                where: { socketId: socketId },
                attributes: ['userId']
            }).then(userId => userId.get('id'))
            console.debug('Id of User: ', userId)

            console.debug("Trying to get ROOM of the User ", userId)
            const roomId = await User.findByPk(userId)['roomId']
            if (roomId) {
                const room = await Room.findByPk(roomId)
                console.log(JSON.parse(JSON.stringify(room)))
                console.debug("\n######## GET PLAYER IN ROOM REQUEST: FINISHED ######")
                return JSON.parse(JSON.stringify(room))
            } else {
                console.warn("User without room trying to send message!")
                return
            }

        } catch (ex) {
            console.log("Error: ", ex.message)
            console.debug("\n######## GET PLAYER IN ROOM REQUEST: FINISHED ######")
        }

    },

    async getRoomData(data) {
        const { room, player } = data

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