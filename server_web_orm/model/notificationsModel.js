import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import usersModel from "./usersModel.js";

const notificationsModel = sequelize.define(
  "notifications",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: usersModel, key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    message: { type: DataTypes.TEXT, allowNull: false },
    link: { type: DataTypes.STRING, allowNull: true },
    is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { timestamps: true }
);

export default notificationsModel;
