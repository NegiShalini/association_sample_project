"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("addresses", [
      {
        id: 1,
        city: "kotdwara",
        state: "utatrakhand",
        country: "India",
        studentId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:2,
        city: "ghaziabad",
        state: "uttar pradesh",
        country: "India",
        studentId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:3,
        city: "Crossing Republic",
        state: "Madhay pradesh",
        country: "India",
        studentId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:4,
        city: "Gaur City",
        state: "Bihar",
        country: "India",
        studentId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:5,
        city: "Indor",
        state: "Mumbai",
        country: "India",
        studentId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:6,
        city: "Goa",
        state: "Goa",
        country: "India",
        studentId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("addresses", null, {});
  },
};