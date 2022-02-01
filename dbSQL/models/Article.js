'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Article extends Model {
        static associate(models) {
        }
    }

    Article.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            text: {
                type: DataTypes.STRING,
            },
            author_id: {
                type: DataTypes.INTEGER,
            }
        }, {
            sequelize,
            modelName: 'Article',
            timestamps: false
        }
    )
    return Article;
}
