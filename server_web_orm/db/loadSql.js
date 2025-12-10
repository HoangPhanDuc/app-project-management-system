import fs from "fs";
import path from "path";
import sequelize from "../config/database.js";

export const runSQLFiles = async () => {
  try {
    const sqlPath = path.resolve("db/triggers/activityLog.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");

    await sequelize.query(sql, { raw: true });

    console.log("SQL executed successfully!");
  } catch (error) {
    console.error("Error executing SQL file:", error);
  }
};
