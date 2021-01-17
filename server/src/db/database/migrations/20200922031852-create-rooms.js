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
      name: {
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
      winner: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      minimumPlayersToStart: {
        type: Sequelize.INTEGER
      },
      minimumCardsToStart: {
        type: Sequelize.INTEGER
      },
      selectedDecksIds: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      deck: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      morto: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      results: {
        type: Sequelize.STRING
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
