import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import usersModel from "./usersModel.js";
import tasksModel from "./tasksModel.js";

const attachmentsModel = sequelize.define(
  "attachments",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    task_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: tasksModel, key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    file_url: { type: DataTypes.STRING, allowNull: false },
    file_type: { type: DataTypes.STRING, allowNull: true },
    uploaded_by: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: usersModel, key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
  },
  { timestamps: true }
);

export default attachmentsModel;
