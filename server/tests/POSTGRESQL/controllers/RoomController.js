const Room = require('../models/Room')
const User = require('../models/User')

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

            }

        } catch (ex) {

            console.log("Error: ", ex.message)
            console.debug("############ NEW ROOM REQUEST: FINISHED ############\n")

        }
    },

    async listUsersInRoom(data) {

    }
}