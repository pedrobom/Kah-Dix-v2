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

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'hostId', as: 'owner' })
        // this.hasMany(models.User, { foreignKey: 'playersId', as: 'players' })
    }
}

module.exports = Room