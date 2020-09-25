const User = require('../models/User')
const Socket = require('../models/Socket')

module.exports = {

    async createUserAsync(socketId) {
        console.debug("\n############ NEW USER REQUEST: START ###############")
        try {
            console.debug('Trying to POST new user!')
            console.debug(socketId)
            const user = await User.create()
            const socket = await Socket.findOne({ where: { socketId: socketId } })
            if (socket === null) {
                // EXPLORAR HIPÓTESES >>> (...)
            } else {
                await Socket.update(
                    {
                        userId: user.id
                    },
                    {
                        where: { socketId: socketId }
                    }
                )
                console.log("Socket table updated with user of id ", user.id)
                console.log(JSON.parse(JSON.stringify(user)))
                return JSON.parse(JSON.stringify(user))
            }
            console.debug("############ NEW USER REQUEST: FINISHED ############\n")


            // console.debug("User [%s] alread exists!", existingRoom)
            // console.debug("############ NEW USER REQUEST: FINISHED ##############\n")

        } catch (ex) {
            console.log("Error: ", ex.message)
            console.debug("############ NEW USER REQUEST: FINISHED ############\n")
        }
    },

    async nameUserAsync(user, name) {
        console.debug("\n############ UPDATE NAME OF USER REQUEST: START ##############")

        console.debug('Trying to UPDATE user\'s name of User [%s] to: [%s]', user.id, name)
        console.debug('Destructure input\nAwaiting connection with database...')

        const userNamed = await User.update(
            {
                name: name
            },
            {
                where: { id: user.id }
            }
        )
        console.debug("User name updated:")
        console.log(JSON.parse(JSON.stringify(userNamed)))
        console.debug("\n############ UPDATE NAME OF USER REQUEST: FINISHED ##########")

    }
}