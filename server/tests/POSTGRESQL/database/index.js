const Sequelize = require('sequelize')
const dbConfig = require('../config/config')

const Room = require('../models/Room')
const User = require('../models/User')
const Socket = require('../models/Socket')

require('dotenv').config()

const connection = new Sequelize(dbConfig)

User.init(connection)
Room.init(connection)
Socket.init(connection)

User.associate(connection.models)
Room.associate(connection.models)
Socket.associate(connection.models)

module.exports = connection