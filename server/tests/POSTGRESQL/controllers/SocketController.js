const Socket = require('../models/Socket')

module.exports = {

    async createSocketRow(data) {
        try {
            const { socketId } = data

            console.debug('Storing NEW socket id to database:')
            console.debug({ socketId })
            await Socket.create({ socketId })

        } catch (ex) {
            console.log("Error: ", ex.message)
        }
    }
}