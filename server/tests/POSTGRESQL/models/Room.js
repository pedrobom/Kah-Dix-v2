const { Model, DataTypes } = require('sequelize')

class Room extends Model {
    static init(connection) {
        super.init({
            roomName: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: 'rooms'
        })
    }

    static associate(models) {
        this.hasMany(models.User, { foreignKey: 'roomId', as: 'players' })
        this.belongsTo(models.User, { foreignKey: 'hostId' })
    }
}

module.exports = Room