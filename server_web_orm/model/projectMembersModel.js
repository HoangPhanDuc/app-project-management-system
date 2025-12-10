import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import usersModel from "./usersModel.js";
import projectsModel from "./projectsModel.js";

const projectMembersModel = sequelize.define("project_members", {
  project_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: { model: projectsModel, key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: { model: usersModel, key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  },
  role_in_project: { type: DataTypes.STRING, allowNull: false },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  timestamps: true,
  indexes: [{ unique: true, fields: ["project_id","user_id"] }]
});

export default projectMembersModel;
