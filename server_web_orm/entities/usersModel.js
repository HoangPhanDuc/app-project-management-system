import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import rolesModel from "./rolesModel.js";

const usersModel = sequelize.define(
  "users",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: true },
    avatar_url: { type: DataTypes.STRING, allowNull: true },
    refresh_token: { type: DataTypes.STRING, allowNull: true },
    last_login: { type: DataTypes.DATE, allowNull: true },
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: rolesModel, key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { timestamps: true }
);

export default usersModel;
