import { Sequelize } from "sequelize";

import dotenv from "dotenv";
dotenv.config();
console.log("================================");

const sequelize = new Sequelize(
  "postgresql://postgres:ugbo9WCEKH3SwJh5@db.bicofnobkczquxvztyzl.supabase.co:5432/postgres"
);

export default sequelize;
