const User = require('../models/User')
const Room = require('../models/Room')

module.exports = {

    async createUser(data) {
        console.debug("\n############ NEW USER REQUEST: START ##############")
        try {
            const { name, socketId } = data
            // console.debug('Checking if user alread exists:')
            // DEPOIS CHECAR SE O USER JÁ TEM OS SOCKETS.IDS DENTRO DO ARRAY DE SOCKET!!!!

            console.debug('Trying to POST new user!')
            console.debug('Destructure req.body\nAwaiting connection with database...')
            console.debug({ name, socketId })
            await User.create({ name, socketId })

            console.debug("############ NEW USER REQUEST: FINISHED ##############\n")

            // console.debug("User [%s] alread exists!", existingRoom)
            // console.debug("############ NEW USER REQUEST: FINISHED ##############\n")

        } catch (ex) {
            console.log("Error: ", ex.message)
            console.debug("############ NEW USER REQUEST: FINISHED ############\n")
        }
    }
}