"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Events",
      [
        {
          event_name: "Safin FC",
          status: "Active",
          date: new Date(),
          time: "Senin-Minggu, 13.00, 17.00, 21.00",
          people: "10",
          fieldId: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          event_name: "Pendekar United",
          status: "Active",
          date: new Date(),
          time: "Senin-Minggu, 13.00, 17.00, 21.00",
          people: "10",
          fieldId: 2,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Events", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
