import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const rolesModel = sequelize.define(
  "roles",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    role_name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { timestamps: false }
);

export default rolesModel;
