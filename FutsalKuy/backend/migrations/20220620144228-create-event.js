"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      event_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
      },
      time: {
        type: Sequelize.STRING,
      },
      people: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING
      },
      orderId: {
        type: Sequelize.STRING,
      },
      fieldId: {
        type: Sequelize.INTEGER,
        reference: {
          model: "Fields",
          key: "id",
        },
        onDelete: "Cascade",
        onUpdate: "Cascade",
      },
      userId: {
        type: Sequelize.INTEGER,
        reference: {
          model: "Users",
          key: "id",
        },
        onDelete: "Cascade",
        onUpdate: "Cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Events");
  },
};
