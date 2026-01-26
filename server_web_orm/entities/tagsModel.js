import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const tagsModel = sequelize.define(
  "tags",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { timestamps: false }
);

export default tagsModel;
