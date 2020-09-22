'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn(
      'users',
      'roomId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'rooms', key: 'id' },
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

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('users', 'roomId');

    await queryInterface.removeColumn('rooms', 'hostId');

  }
};
