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
        this.hasMany(models.Socket, { foreignKey: 'roomId', as: 'socketsIds' })
        this.belongsTo(models.User, { foreignKey: 'hostId' })
    }

    static States = {
        WAITING_FOR_PLAYERS: "WAITING_FOR_PLAYERS",
        ONGOING_GAME: "ONGOING_GAME",
        PICKING_PROMPT: "PICKING_PROMPT",
        SELECTING_CARDS: "SELECTING_CARDS",
        VOTING: "VOTING",
        GAME_ENDED: "GAME_ENDED"
    }
}

module.exports = Room