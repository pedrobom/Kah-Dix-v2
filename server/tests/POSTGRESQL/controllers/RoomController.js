const Room = require('../models/Room')
const User = require('../models/User')

module.exports = {

    async createRoom(data) {

        console.debug("\n############ NEW ROOM REQUEST: START ##############")

        try {

            const { roomName, socketId } = data
            console.log("Data received ", { roomName, socketId })
            console.debug('Checking if room alread exists:')
            const existingRoom = await Room.findOne({ where: { roomName: roomName } })

            if (!existingRoom) {
                // console.debug('Checking if user alread in room')
                console.debug('Trying to POST new room!')
                console.debug('Destructure req.body\nAwaiting connection with database...')
                console.debug("Trying to get id user of socket.id ", socketId)

                const userId = await User.findOne({
                    where: { socketId: socketId },
                    attributes: ['id']
                }).then(id => id.get('id'))
                console.log("User id: ", userId)
                console.log("Passing data to create room: ", { roomName: roomName, hostId: userId })

                await Room.create({ roomName: roomName, hostId: userId })
                console.debug("############ NEW ROOM REQUEST: FINISHED #############\n")

            } else {

                console.debug("Room [%s] alread exists!", existingRoom)
                console.debug("############ NEW ROOM REQUEST: FINISHED #############\n")

            }

        } catch (ex) {

            console.log("Error: ", ex.message)
            console.debug("############ NEW ROOM REQUEST: FINISHED ############\n")

        }
    }
}