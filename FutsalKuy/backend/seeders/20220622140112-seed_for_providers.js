"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Providers",
      [
        {
          provider_name: "Elang Futsal",
          location: "Jl. Taman Mutiara Prima No.10, RT.2/RW.3, Kb. Jeruk, Kec. Kb. Jeruk, Kota Jakarta Barat",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          provider_name: "Futsal Cilandak Sport Centre",
          location: "Town Square, Cilandak, Jl. TB Simatupang No.2, Cilandak Bar., Kec. Cilandak",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Providers", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
