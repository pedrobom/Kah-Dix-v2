'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
      'sockets',
      'userId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn('sockets', 'userId');

  }
};
