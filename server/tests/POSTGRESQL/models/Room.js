const { Model, DataTypes } = require('sequelize')

class Room extends Model {
    static init(connection) {
        super.init({
            state: {
                type: DataTypes.STRING,
                defaultValue: "WAITING_FOR_PLAYERS"
            },
            roomName: DataTypes.STRING,
            turn: {
                type: DataTypes.INTEGER,
                defaultValue: 1
            },
            currentPlayerIndex: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            prompt: DataTypes.STRING,
            selectedCardCount: DataTypes.STRING,
            victory: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: 'rooms'
        })
    }

    static associate(models) {
        this.hasMany(models.RoomPlayer, { foreignKey: 'roomId', as: 'players' })
        this.belongsTo(models.User, { foreignKey: 'hostId' })
    }
}

module.exports = Room