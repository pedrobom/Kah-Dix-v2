const Sequelize = require('sequelize')
const dbConfig = require('../config/config')

const Room = require('../models/Room')

require('dotenv').config()

const connection = new Sequelize(dbConfig)

Room.init(connection)

module.exports = connection