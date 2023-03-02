"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "test2", {
      type: Sequelize.STRING,
    });
  },
  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn("users", "test2");
  },
};
