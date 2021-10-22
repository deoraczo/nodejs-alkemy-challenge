'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {    
    return await queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('users');
  }
};
