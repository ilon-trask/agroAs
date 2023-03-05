"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addColumn("tech_operations", "date", {
      type: Sequelize.STRING,
    });
  },
  async down(queryInterface, Sequelize) {
    return await queryInterface.removeColumn("tech_operations", "date");
  },
};
