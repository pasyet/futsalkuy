'use strict';
const { hashingPassword } = require('../helpers/bcrypt-helpers')
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Users', [
      {
        username: 'dia',
        email: 'dia@mail.com',
        password: hashingPassword('12345'),
        phoneNumber:'+62456789012',
        address:'Jl. Mawar',
        profilePic: 'aaaaa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'wawan',
        email: 'wawan@mail.com',
        password: hashingPassword('12345'),
        phoneNumber:'+62456789012',
        address:'Jl. Tulip',
        profilePic:'bbbbb',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'widi',
        email: 'widi@mail.com',
        password: hashingPassword('12345'),
        phoneNumber:'+62456789012',
        address:'Jl. Cempaka',
        profilePic:'cccc',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
