const Sequelize = require('sequelize')
const dbConfig = require('../config/config')

const Room = require('../models/Room')
const User = require('../models/User')

require('dotenv').config()

const connection = new Sequelize(dbConfig)

Room.init(connection)
User.init(connection)

module.exports = connection