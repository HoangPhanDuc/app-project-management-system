import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const activityLogsModel = sequelize.define(
  "activity_logs",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    project_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    task_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    action: { type: DataTypes.STRING, allowNull: false },
    old_value: { type: DataTypes.TEXT, allowNull: true },
    new_value: { type: DataTypes.TEXT, allowNull: true },
  },
  { timestamps: true },
);

export default activityLogsModel;
