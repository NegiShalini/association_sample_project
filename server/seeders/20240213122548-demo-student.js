'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("students", [
      {
        id: 7,
        first_name: "shalini",
        last_name: "Negi",
        date_of_birth: "7/12/2001",
        gender: "Female",
        email: "shalini@gmail.com",
        phone: 9876543219,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        first_name: "Manshi",
        gender: "Female",
        last_name: "Rajput",
        date_of_birth: "7/07/2001",
        email: "manshi@gmail.com",
        phone: 9876763219,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        first_name: "Paras",
        gender: "Male",
        email: "paras@gmail.com",
        last_name: "rawal",
        date_of_birth: "7/07/2007",
        phone: 7876543219,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        first_name: "Bhanit",
        gender: "Male",
        email: "bhanit@gmail.com",
        last_name: "Gaurav",
        date_of_birth: "6/06/1992",
        phone: 8876543219,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        first_name: "Ankit",
        gender: "Male",
        email: "ankit@gmail.com",
        phone: 9876543216,
        last_name: "Saxsena",
        date_of_birth: "1/01/1998",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        first_name: "Suraj",
        gender: "Male",
        email: "suraj@gmail.com",
        phone: 9076503219,
        last_name: "Kumar",
        date_of_birth: "1/02/2000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {

    return queryInterface.bulkDelete("students", null, {});
  }
};
