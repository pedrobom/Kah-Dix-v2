const User = require('../models/User')

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
    },

    async list(req, res) {
        console.debug("\n############ GET REQUEST: START ##############")
        try {
            console.debug('Trying to GET rooms!')
            console.debug('Awaiting connection with database...')
            const users = await User.findAll()

            console.debug(rooms)
            console.debug("############ GET REQUEST: FINISHED ############\n")
            return res.status(200).json(users)

        } catch (ex) {
            console.log('Status 500: ', ex.message)
            console.debug("############ POST REQUEST: FINISHED ##############\n")
            return res.status(500).send(ex.message)
        }
    },

    async getOne(req, res) { },


    async put(req, res) { },

    async delete(req, res) { }
}