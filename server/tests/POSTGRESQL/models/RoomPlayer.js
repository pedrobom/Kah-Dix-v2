const { Model, DataTypes } = require('sequelize')

class RoomPlayer extends Model {
    static init(connection) {
        super.init({
            score: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            turnScore: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            hand: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: []
            },
            mySelectedCard: {
                type: DataTypes.STRING,
                defaultValue: null
            },
            selectedCard: {
                type: DataTypes.STRING,
                defaultValue: null
            },
            votedCard: {
                type: DataTypes.STRING,
                defaultValue: null
            },
        }, {
            sequelize: connection,
            tableName: 'roomPlayers'
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'userId' })
        this.belongsTo(models.Room, { foreignKey: 'roomId' })
    }
}

module.exports = RoomPlayer