import { Sequelize } from "sequelize";
import { runSQLFiles } from "../db/loadSql.js";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
    dialectOptions: { multipleStatements: true },
  }
);

// Retry connection function
async function connectWithRetry() {
  let connected = false;
  while (!connected) {
    try {
      await sequelize.authenticate();
      console.log("Connected db successfully!");
      await sequelize.sync();
      console.log("Table is checked and created!");
      await runSQLFiles();
      console.log("Initial SQL files are loaded!");
      connected = true;
    } catch (error) {
      console.error("DB connection failed, retrying in 3s...", error.message);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
}

// Start connection
connectWithRetry();

export default sequelize;
