'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('rooms', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "WAITING_FOR_PLAYERS"
      },
      roomName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      turn: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      currentPlayerIndex: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      prompt: {
        type: Sequelize.STRING,
        allowNull: true
      },
      selectedCardCount: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      victory: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      isWinner: {
        type: Sequelize.BOOLEAN,
        allowNull: true
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

    return queryInterface.dropTable('rooms');

  }
};
