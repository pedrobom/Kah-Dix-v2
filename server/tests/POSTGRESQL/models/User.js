const { Model, DataTypes } = require('sequelize')

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            socketId: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'users'
        })
    }

    static associate(models) {
        this.belongsTo(models.Room, { foreignKey: 'roomId', as: 'player' })
        this.hasOne(models.Room, { foreignKey: 'hostId' })
        this.hasMany(models.Socket, { foreignKey: 'userId', as: 'sockets' })
    }
}

module.exports = User