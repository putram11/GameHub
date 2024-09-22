"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("password123", 10);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "admin",
          email: "admin@example.com",
          password: hashedPassword,
          role: "Admin",
          phoneNumber: "1234567890",
          address: "123 Admin St",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "user1",
          email: "user1@example.com",
          password: hashedPassword,
          role: "Staff",
          phoneNumber: "1234567891",
          address: "123 User St",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "user2",
          email: "user2@example.com",
          password: hashedPassword,
          role: "Staff",
          phoneNumber: "1234567892",
          address: "124 User St",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "user3",
          email: "user3@example.com",
          password: hashedPassword,
          role: "Staff",
          phoneNumber: "1234567893",
          address: "125 User St",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "user4",
          email: "user4@example.com",
          password: hashedPassword,
          role: "Staff",
          phoneNumber: "1234567894",
          address: "126 User St",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
