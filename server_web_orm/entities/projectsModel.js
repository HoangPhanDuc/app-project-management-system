import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import usersModel from "./usersModel.js";

const projectsModel = sequelize.define(
  "projects",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    owner_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: usersModel, key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    status: {
      type: DataTypes.ENUM("active", "completed", "archived"),
      defaultValue: "active",
    },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { timestamps: true }
);

export default projectsModel;
