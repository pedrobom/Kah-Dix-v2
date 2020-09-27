const { Model, DataTypes } = require('sequelize')

class User extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: 'users'
        })
    }

    static associate(models) {
        this.hasOne(models.RoomPlayer, { foreignKey: 'userId', as: 'player' })
        this.hasOne(models.Room, { foreignKey: 'hostId', as: 'host' })
        this.hasMany(models.Socket, { foreignKey: 'userId', as: 'sockets' })
    }

    // hasSocket(id) {
    //     return this.hasSockets()
    // }

    toString() {
        return this.id
    }
}

module.exports = User