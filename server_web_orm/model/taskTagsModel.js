import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import tasksModel from "./tasksModel.js";
import tagsModel from "./tagsModel.js";

const taskTagsModel = sequelize.define(
  "task_tags",
  {
    task_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: tasksModel, key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    tag_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: tagsModel, key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: false,
    indexes: [{ unique: true, fields: ["task_id", "tag_id"] }],
  }
);

export default taskTagsModel;
