'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('results', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      turn: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      turnPlayer: {
        type: Sequelize.STRING,
        allowNull: false
      },
      turnPrompt: {
        type: Sequelize.STRING,
        allowNull: false
      },
      turnPlayerCard: {
        type: Sequelize.STRING,
        allowNull: false
      },
      turnPlayerScore: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('results');

  }
};
