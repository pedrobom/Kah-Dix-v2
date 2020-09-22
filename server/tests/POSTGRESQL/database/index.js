const Sequelize = require('sequelize')
const dbConfig = require('../config/config')

const Room = require('../models/Room')
const User = require('../models/User')

require('dotenv').config()

const connection = new Sequelize(dbConfig)

User.init(connection)
Room.init(connection)

Room.associate(connection.models)

module.exports = connection