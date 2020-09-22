const { Model, DataTypes } = require('sequelize')

class Room extends Model {
    static init(sequelize) {
        super.init({
            roomName: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'rooms'
        })
    }
}

module.exports = Room