import express from "express";
import {
  createTaskController,
  deleteTaskController,
  getTaskByProjectIdController,
  getTasksByIdController,
  updateTaskController,
} from "../controller/tasksController.js";
import { handleValidation } from "../middleware/handleValidation.js";
import { validateIdParam } from "../validation/validateIdParam.js";
import {
  createTaskValidator,
  updateTaskValidator,
} from "../validation/validateTasks.js";
import { authenticate } from "../middleware/authentication.js";

const taskRoute = express.Router();

taskRoute.post(
  "/create-task",
  authenticate,
  createTaskValidator,
  handleValidation,
  createTaskController
);
taskRoute.patch(
  "/update-task/:id",
  authenticate,
  updateTaskValidator,
  handleValidation,
  updateTaskController
);
taskRoute.get(
  "/get-task-by-projects/:id",
  authenticate,
  validateIdParam,
  handleValidation,
  getTaskByProjectIdController
);
taskRoute.get(
  "/get-task/:id",
  authenticate,
  validateIdParam,
  handleValidation,
  getTasksByIdController
);
taskRoute.delete(
  "/delete-task/:id",
  authenticate,
  validateIdParam,
  handleValidation,
  deleteTaskController
);

export default taskRoute;
