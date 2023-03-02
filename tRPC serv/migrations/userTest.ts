"use strict";
import { QueryInterface } from "sequelize";
import { DataType, Sequelize } from "sequelize-typescript";
export default {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    await queryInterface.addColumn("user", "test", { type: DataType.STRING });
  },
  down(queryInterface: QueryInterface, sequelize: Sequelize) {
    queryInterface.removeColumn("user", "test");
  },
};
