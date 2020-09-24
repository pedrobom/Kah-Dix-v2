'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('roomPlayers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      turnScore: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      hand: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        defaultValue: []
      },
      mySelectedCard: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      selectedCard: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      votedCard: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
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

    return queryInterface.dropTable('roomPlayers');

  }
};
