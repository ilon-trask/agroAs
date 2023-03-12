"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "tractors",
      "copiedFromId",
      Sequelize.INTEGER
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("tractor", "copiedFromId");
  },
};
