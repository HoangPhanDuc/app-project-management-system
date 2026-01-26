import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import usersModel from "./usersModel.js";
import projectsModel from "./projectsModel.js";

const tasksModel = sequelize.define(
  "tasks",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    project_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: projectsModel, key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    status: {
      type: DataTypes.ENUM("to-do", "in-progress", "done"),
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high"),
      allowNull: false,
    },
    deadline: { type: DataTypes.DATE, allowNull: true },
    start_date: { type: DataTypes.DATE, allowNull: true },
    assigned_to: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: { model: usersModel, key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    created_by: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: usersModel, key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { timestamps: true }
);

export default tasksModel;
