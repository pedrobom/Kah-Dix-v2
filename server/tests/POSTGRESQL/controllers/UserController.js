const User = require('../models/User')
const Socket = require('../models/Socket')

module.exports = {

    async createUser(data) {
        console.debug("\n############ NEW USER REQUEST: START ###############")
        try {
            const { socketId } = data

            console.debug('Trying to POST new user!')
            console.debug('Destructure input\nAwaiting connection with database...')
            console.debug({ socketId })
            const user = await User.create({ socketId })
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
            console.debug("############ NEW USER REQUEST: FINISHED ############\n")
            return user

            // console.debug("User [%s] alread exists!", existingRoom)
            // console.debug("############ NEW USER REQUEST: FINISHED ##############\n")

        } catch (ex) {
            console.log("Error: ", ex.message)
            console.debug("############ NEW USER REQUEST: FINISHED ############\n")
        }
    },

    async nameUser(data) {
        console.debug("\n############ NAME USER REQUEST: START ##############")

        const { name, socketId } = data
        console.debug('Trying to UPDATE name of user of socketId [%s] to: [%s]', socketId, name)
        console.debug('Destructure input\nAwaiting connection with database...')

        await User.update(
            {
                name: name
            },
            {
                where: { socketId: socketId }
            }
        )

        console.debug("\n############ NAME USER REQUEST: FINISHED ###########")

    }
}