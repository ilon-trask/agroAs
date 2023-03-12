"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "agricultural_machines",
      "copiedFromId",
      Sequelize.INTEGER
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("agricultural_machines", "copiedFromId");
  },
};
