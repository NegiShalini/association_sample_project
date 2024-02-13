'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("students", [
      {
        id: 1,
        name: "shalini",
        gender: "Female",
        email: "shalini@gmail.com",
        phone: 9876543219,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Manshi",
        gender: "Female",
        email: "manshi@gmail.com",
        phone: 9876763219,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "Paras",
        gender: "Male",
        email: "paras@gmail.com",
        phone: 7876543219,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "Bhanit",
        gender: "Male",
        email: "bhanit@gmail.com",
        phone: 8876543219,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: "Ankit",
        gender: "Male",
        email: "ankit@gmail.com",
        phone: 9876543216,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: "Suraj",
        gender: "Male",
        email: "suraj@gmail.com",
        phone: 9076503219,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {

    return queryInterface.bulkDelete("students", null, {});
  }
};
