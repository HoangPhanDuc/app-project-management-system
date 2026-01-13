import express from "express";
import {
  createProjectsController,
  deleteAllProjectsController,
  deleteProjectsController,
  getAllProjectsController,
  getOneProjectController,
  updateProjectsController,
} from "../controller/projectsController.js";
import { authenticate, authorize } from "../middleware/authentication.js";

const projectsRoutes = express.Router();

projectsRoutes.post(
  "/create-project",
  authenticate,
  authorize("admin"),
  createProjectsController
);
projectsRoutes.get(
  "/get-all-projects",
  authenticate,
  authorize("admin"),
  getAllProjectsController
);
projectsRoutes.get(
  "/get-project/:id",
  authenticate,
  authorize("admin"),
  getOneProjectController
);
projectsRoutes.patch(
  "/update-project/:id",
  authenticate,
  authorize("admin"),
  updateProjectsController
);
projectsRoutes.delete(
  "/delete-project/:id",
  authenticate,
  authorize("admin"),
  deleteProjectsController
);
projectsRoutes.delete(
  "/delete-all-projects",
  authenticate,
  authorize("admin"),
  deleteAllProjectsController
);

export default projectsRoutes;
