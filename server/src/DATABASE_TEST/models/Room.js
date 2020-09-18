const { Model, DataTypes } = require('sequelize')

class Room extends Model {
    static init(connection) {
        super.init({ host: DataTypes.STRING }, { sequelize: connection })
    }
}

module.exports = Room