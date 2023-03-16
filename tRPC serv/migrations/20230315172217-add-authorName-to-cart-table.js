"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "tech_carts",
      "authorName",
      Sequelize.STRING
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("tech_carts", "authorName");
  },
};
