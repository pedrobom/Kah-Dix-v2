const Socket = require('../models/Socket')


module.exports = {

    async createSocketAsync(socketId) {
        console.debug("\n############ NEW SOCKET REQUEST: START ###############")
        try {

            console.debug('Trying to POST new socket ', socketId)
            const socket = await Socket.create({ socketId: socketId })
            console.debug("############ NEW SOCKET REQUEST: FINISHED ############\n")
            return JSON.parse(JSON.stringify(socket))

        } catch (ex) {
            console.log("Error: ", ex.message)
            console.debug("############ NEW SOCKET REQUEST: FINISHED ############\n")
        }
    },
}