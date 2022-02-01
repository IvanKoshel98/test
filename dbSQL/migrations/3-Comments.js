'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('Comments', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            article_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references:{
                    key:"id",
                    model:"Articles"
                }
            },
            author_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references:{
                    key:"id",
                    model:"Users"
                }
            },
            comment: {
                type: Sequelize.STRING,
                allowNull: false,
            },

        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Comments');
    }
};
