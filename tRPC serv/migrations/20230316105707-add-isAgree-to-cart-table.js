"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("tech_carts", "isAgree", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("tech_carts", "isAgree");
  },
};
