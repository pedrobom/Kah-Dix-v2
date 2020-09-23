const Socket = require('../models/Socket')

module.exports = {

    async createSocketRow(data) {
        console.debug("\n############ NEW SOCKET REQUEST: START ##############")
        try {
            const { socketId } = data

            console.debug('Trying to POST new socketId!')
            console.debug('Destructure input\nAwaiting connection with database...')
            console.debug({ socketId })
            await Socket.create({ socketId })

            console.debug("############ NEW SOCKET REQUEST: FINISHED ##############\n")


        } catch (ex) {
            console.log("Error: ", ex.message)
            console.debug("############ NEW SOCKET REQUEST: FINISHED ############\n")
        }
    }
}