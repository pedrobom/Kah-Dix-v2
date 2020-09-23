const { Model, DataTypes } = require('sequelize')

class Socket extends Model {
    static init(connection) {
        super.init({
            socketId: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: 'sockets'
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'socket' })
    }
}

module.exports = Socket