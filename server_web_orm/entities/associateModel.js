import usersModel from "./usersModel.js";
import rolesModel from "./rolesModel.js";
import projectsModel from "./projectsModel.js";
import projectMembersModel from "./projectMembersModel.js";
import tasksModel from "./tasksModel.js";
import tagsModel from "./tagsModel.js";
import taskTagsModel from "./taskTagsModel.js";
import commentsModel from "./commentsModel.js";
import attachmentsModel from "./attachmentsModel.js";
import activityLogsModel from "./activityLogsModel.js";
import notificationsModel from "./notificationsModel.js";

// Users & Roles
usersModel.belongsTo(rolesModel, { foreignKey: "role_id" });
rolesModel.hasMany(usersModel, { foreignKey: "role_id" });

// Projects & Owner
projectsModel.belongsTo(usersModel, { foreignKey: "owner_id", as: "owner" });
usersModel.hasMany(projectsModel, {
  foreignKey: "owner_id",
  as: "owned_projects",
});

// Project Members
projectMembersModel.belongsTo(usersModel, {
  foreignKey: "user_id",
  as: "user",
});
projectMembersModel.belongsTo(projectsModel, {
  foreignKey: "project_id",
  as: "project",
});
usersModel.hasMany(projectMembersModel, {
  foreignKey: "user_id",
  as: "project_memberships",
});
projectsModel.hasMany(projectMembersModel, {
  foreignKey: "project_id",
  as: "members",
});

// Tasks
tasksModel.belongsTo(projectsModel, {
  foreignKey: "project_id",
  as: "project",
});
tasksModel.belongsTo(usersModel, { foreignKey: "assigned_to", as: "assignee" });
tasksModel.belongsTo(usersModel, { foreignKey: "created_by", as: "creator" });

projectsModel.hasMany(tasksModel, { foreignKey: "project_id", as: "tasks" });
usersModel.hasMany(tasksModel, {
  foreignKey: "assigned_to",
  as: "assigned_tasks",
});
usersModel.hasMany(tasksModel, {
  foreignKey: "created_by",
  as: "created_tasks",
});

// Tags & Task_Tags
taskTagsModel.belongsTo(tasksModel, { foreignKey: "task_id", as: "task" });
taskTagsModel.belongsTo(tagsModel, { foreignKey: "tag_id", as: "tag" });
tasksModel.hasMany(taskTagsModel, { foreignKey: "task_id", as: "task_tags" });
tagsModel.hasMany(taskTagsModel, { foreignKey: "tag_id", as: "tagged_tasks" });

// Comments
commentsModel.belongsTo(tasksModel, { foreignKey: "task_id", as: "task" });
commentsModel.belongsTo(usersModel, { foreignKey: "user_id", as: "user" });
tasksModel.hasMany(commentsModel, { foreignKey: "task_id", as: "comments" });
usersModel.hasMany(commentsModel, { foreignKey: "user_id", as: "comments" });

// Attachments
attachmentsModel.belongsTo(tasksModel, { foreignKey: "task_id", as: "task" });
attachmentsModel.belongsTo(usersModel, {
  foreignKey: "uploaded_by",
  as: "uploader",
});
tasksModel.hasMany(attachmentsModel, {
  foreignKey: "task_id",
  as: "attachments",
});
usersModel.hasMany(attachmentsModel, {
  foreignKey: "uploaded_by",
  as: "uploaded_files",
});

// Activity Logs
activityLogsModel.belongsTo(usersModel, { foreignKey: "user_id", as: "user" });
usersModel.hasMany(activityLogsModel, {
  foreignKey: "user_id",
  as: "activity_logs",
});

activityLogsModel.belongsTo(projectsModel, {
  foreignKey: "project_id",
  as: "project",
});
projectsModel.hasMany(activityLogsModel, {
  foreignKey: "project_id",
  as: "activity_logs",
});

activityLogsModel.belongsTo(tasksModel, { foreignKey: "task_id", as: "task" });
tasksModel.hasMany(activityLogsModel, {
  foreignKey: "task_id",
  as: "activity_logs",
});

// Notifications
notificationsModel.belongsTo(usersModel, { foreignKey: "user_id", as: "user" });
usersModel.hasMany(notificationsModel, {
  foreignKey: "user_id",
  as: "notifications",
});
