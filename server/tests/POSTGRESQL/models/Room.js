const { Model, DataTypes } = require('sequelize')

class Room extends Model {
    static init(connection) {
        super.init({
            state: DataTypes.STRING,
            roomName: DataTypes.STRING,
            turn: DataTypes.INTEGER,
            currentPlayerIndex: DataTypes.INTEGER,
            prompt: DataTypes.STRING,
            selectedCardCount: DataTypes.STRING,
            victory: DataTypes.STRING,
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