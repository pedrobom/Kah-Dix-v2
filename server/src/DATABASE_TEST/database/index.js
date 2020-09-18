const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const Room = require('../models/Room')

const connection = new Sequelize(dbConfig)

Room.init(connection)

module.exports = connection