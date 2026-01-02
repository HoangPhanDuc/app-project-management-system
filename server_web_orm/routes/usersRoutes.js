import express from "express";
import {
  deleteUserController,
  getAllUserController,
  getByIdUserController,
} from "../controller/usersController.js";
import { authenticate, authorize } from "../middleware/authentication.js";

const usersRoutes = express.Router();

usersRoutes.get(
  "/get-all-users",
  authenticate,
  authorize("admin"),
  getAllUserController
);
usersRoutes.get(
  "/users/:id",
  authenticate,
  authorize("admin"),
  getByIdUserController
);
usersRoutes.delete(
  "/users-delete/:id",
  authenticate,
  authorize("admin"),
  deleteUserController
);

export default usersRoutes;
