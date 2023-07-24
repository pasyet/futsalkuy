"use strict";

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Fields', [
      {
        field_name: "Elang Futsal",
        field_type: "Futsal Rumput Sintetis",
        price: "250000",
        latitude: "-6.18173",
        longitude: "106.77913",
        schedule: "Senin - Minggu, 13.00 - 22.00",
        providerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        field_name: "Futsal Cilandak Sport Centre",
        field_type: "Futsal Rumput Sintetis",
        price: "250000",
        latitude: "-6.27791",
        longitude: "106.80418",
        schedule: "Senin - Minggu, 13.00 - 22.00",
        providerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Fields", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
