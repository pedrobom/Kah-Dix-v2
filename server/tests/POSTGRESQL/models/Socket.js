const { Model, DataTypes } = require('sequelize')

class Socket extends Model {
    static init(sequelize) {
        super.init({
            socketId: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'sockets'
        })
    }

    static associate(models) {
        this.belongsTo(models, { foreignKey: 'userId', as: 'socket' })
    }
}

module.exports = Socket