const User = require('../models/User')
const Socket = require('../models/Socket')

module.exports = {

    async createUserAsync(socket) {
        console.debug("\n############ NEW USER REQUEST: START ###############")
        try {


            console.debug('Trying to POST new user!')
            const user = await User.create()
            const socketId = socket.socketId

            console.debug('Storing NEW socket to database belonging to User ', user.id)
            console.debug(socketId)
            await Socket.update(
                {
                    userId: user.id
                },
                {
                    where: { socketId: socketId }
                }
            )

            console.log(JSON.parse(JSON.stringify(user)))
            console.debug("############ NEW USER REQUEST: FINISHED ############\n")
            return JSON.parse(JSON.stringify(user))

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