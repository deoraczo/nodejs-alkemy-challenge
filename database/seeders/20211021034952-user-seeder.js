'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return await queryInterface.bulkInsert(
      'users', 
      [
        {
          email: 'admins@gmail.com',
          password: '12345678',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          email: 'adminss@gmail.com',
          password: '12345678',
          created_at: new Date(),
          updated_at: new Date()
        }
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('users', null, {});
  }
};
