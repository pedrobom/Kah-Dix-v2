const Socket = require('../models/Socket')

module.exports = {

    async createSocketRowAsync(socketId) {
        try {

            console.debug('Storing NEW socket id to database:')
            console.debug(socketId)
            await Socket.create({ socketId: socketId })

        } catch (ex) {
            console.log("Error: ", ex.message)
        }
    }
}