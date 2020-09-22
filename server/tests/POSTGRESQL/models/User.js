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
        this.belongsTo(models, { foreignKey: 'roomId', as: 'player' })
        this.hasOne(models, { foreignKey: 'hostId' })
    }
}

module.exports = User