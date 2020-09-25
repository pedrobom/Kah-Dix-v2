'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn(
      'sockets',
      'userId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

    await queryInterface.addColumn(
      'rooms',
      'hostId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

    await queryInterface.addColumn(
      'roomPlayers',
      'userId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

    await queryInterface.addColumn(
      'roomPlayers',
      'roomId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'rooms', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('sockets', 'userId');

    await queryInterface.removeColumn('rooms', 'hostId');

    await queryInterface.removeColumn('roomPlayers', 'userId');

    await queryInterface.removeColumn('roomPlayers', 'roomId');


  }
};
