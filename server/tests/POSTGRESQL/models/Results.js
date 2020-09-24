const { Model, DataTypes } = require('sequelize')

class Results extends Model {
    static init(connection) {
        super.init({
            turn: DataTypes.INTEGER,
            turnPlayer: DataTypes.INTEGER,
            turnPrompt: DataTypes.STRING,
            turnPlayerCard: DataTypes.STRING,
            turnPlayerScore: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: 'results'
        })
    }

    static associate(models) {
    }
}

module.exports = Results