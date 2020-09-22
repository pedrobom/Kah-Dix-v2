const Room = require('../models/Room')
const User = require('../models/User')

module.exports = {

    async createRoom(data) {
        console.debug("\n############ NEW ROOM REQUEST: START ##############")
        try {
            const { roomName } = data
            console.debug('Checking if room alread exists:')
            const existingRoom = await Room.findOne({ where: { roomName: roomName } })
            if (!existingRoom) {
                console.debug('Checking if user alread in room')
                console.debug('Trying to POST new room!')
                console.debug('Destructure req.body\nAwaiting connection with database...')
                console.debug({ roomName })
                await Room.create({ roomName })

                console.debug("############ NEW ROOM REQUEST: FINISHED ##############\n")
            } else {
                console.debug("Room [%s] alread exists!", existingRoom)
                console.debug("############ NEW ROOM REQUEST: FINISHED ##############\n")
            }

        } catch (ex) {
            console.log("Error: ", ex.message)
            console.debug("############ NEW ROOM REQUEST: FINISHED ############\n")
        }
    },

    async getRooms() {
        console.debug("\n############ GET ALL ROOMS: START ##############")
        try {
            console.debug('Trying to GET rooms!')
            console.debug('Awaiting connection with database...')

            const rooms = await Room.findAll()

            console.debug(rooms)
            console.debug("############ GET ALL ROOMS: FINISHED ############\n")
            return res.status(200).json(rooms)

        } catch (ex) {
            console.log('Status 500: ', ex.message)
            console.debug("############ GET ALL ROOMS: FINISHED ##############\n")
            return res.status(500).send(ex.message)
        }
    },

    async getRoom(roomName) {
        console.debug("\n############ GET ROOM BY ID: START ##############")
        try {
            console.debug('Trying to GET room by NAME!')
            console.debug('Awaiting connection with database...')

            const room = await Room.findByPk({ where: {} })

            console.debug(room)
            console.debug("############ GET ROOM BY ID: FINISHED ############\n")
            return room

        } catch (ex) {
            console.log('Status 500: ', ex.message)
            console.debug("############ GET ROOM BY ID: FINISHED ##############\n")
            return res.status(500).send(ex.message)
        }
    },


    async put(req, res) { },

    async delete(req, res) { }
}