const { Model, DataTypes } = require('sequelize')

class Post extends Model {
    static init(connection) {
        super.init({
            author: DataTypes.STRING,
            title: DataTypes.STRING,
            subtitle: DataTypes.STRING,
            content: DataTypes.TEXT,
        }, {
            sequelize: connection
        })
    }
}

module.exports = Post