const { Model, DataTypes } = require('sequelize')

class RoomPlayer extends Model {
    static init(connection) {
        super.init({
            turnScore: DataTypes.INTEGER,
            hand: DataTypes.ARRAY(DataTypes.STRING),
            turn: DataTypes.INTEGER,
            mySelectedCard: DataTypes.STRING,
            selectedCard: DataTypes.STRING,
            votedCard: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: 'roomPlayers'
        })
    }

    static associate(models) {
    }
}

module.exports = RoomPlayer