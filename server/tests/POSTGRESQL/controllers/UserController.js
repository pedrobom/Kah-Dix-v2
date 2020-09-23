const User = require('../models/User')
const Socket = require('../models/Socket')

module.exports = {

    async createUser(data) {
        console.debug("\n############ NEW USER REQUEST: START ##############")
        try {
            const { name, socketId } = data

            console.debug('Trying to POST new user!')
            console.debug('Destructure input\nAwaiting connection with database...')
            console.debug({ name, socketId })
            const user = await User.create({ name, socketId })
            console.debug('Checking for user in table sockets\nAwaiting connection with database')
            const socket = await Socket.findOne({ where: { socketId: socketId } })
            if (socket === null) {
                // EXPLORAR HIPÓTESES >>> (...)
            } else {
                await Socket.update(
                    {
                        userId: user["id"]
                    },
                    {
                        where: { socketId: socketId }
                    }
                )
                console.log("Socket table updated with user of id ", user["id"])
            }
            console.debug("############ NEW USER REQUEST: FINISHED ##############\n")

            // console.debug("User [%s] alread exists!", existingRoom)
            // console.debug("############ NEW USER REQUEST: FINISHED ##############\n")

        } catch (ex) {
            console.log("Error: ", ex.message)
            console.debug("############ NEW USER REQUEST: FINISHED ############\n")
        }
    }
}