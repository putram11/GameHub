"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "MOBA",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "FPS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Battle Royale",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sports Simulation",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
