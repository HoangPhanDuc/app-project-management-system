import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import usersModel from "./usersModel.js";
import tasksModel from "./tasksModel.js";

const commentsModel = sequelize.define(
  "comments",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    task_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: tasksModel, key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: usersModel, key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    content: { type: DataTypes.TEXT, allowNull: false },
  },
  { timestamps: true }
);

export default commentsModel;
