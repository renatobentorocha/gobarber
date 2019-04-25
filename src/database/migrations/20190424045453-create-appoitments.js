'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appoitments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      provider_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('appoitments')
  }
}
