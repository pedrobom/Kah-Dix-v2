const Room = require('../models/User')

module.exports = {

    async store(req, res) {
        console.debug("\n############ POST REQUEST: START ##############")
        try {
            console.debug('Trying to POST new room!')
            const { name } = req.body
            console.debug('Destructure req.body\nAwaiting connection with database...')
            const user = await User.create({ name })

            console.debug("############ POST REQUEST: FINISHED ##############\n")
            return res.json(user)

        } catch (ex) {
            console.log("Error: ", ex.message)
        }
        console.debug("############ POST REQUEST: FINISHED ############\n")
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