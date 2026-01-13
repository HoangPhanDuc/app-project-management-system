import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import usersModel from "./usersModel.js";
import projectsModel from "./projectsModel.js";
import tasksModel from "./tasksModel.js";

const activityLogsModel = sequelize.define(
  "activity_logs",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: usersModel, key: "id" },
      onUpdate: "CASCADE",
    },
    project_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: { model: projectsModel, key: "id" },
      onUpdate: "CASCADE",
    },
    task_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: { model: tasksModel, key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    action: { type: DataTypes.STRING, allowNull: false },
    old_value: { type: DataTypes.TEXT, allowNull: true },
    new_value: { type: DataTypes.TEXT, allowNull: true },
  },
  { timestamps: true }
);

export default activityLogsModel;
