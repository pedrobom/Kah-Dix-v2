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
        this.hasMany(models, { foreignKey: 'roomId', as: 'players' })
        this.belongsTo(models, { foreignKey: 'hostId' })
    }
}

module.exports = Room