'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('Articles', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            text: {
                type: Sequelize.STRING,
            },
            author_id: {
                type: Sequelize.INTEGER,
                references: {
                    key: "id",
                    model: "Users"
                }
            }

        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Articles');
    }
};
