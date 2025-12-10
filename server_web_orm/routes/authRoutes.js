import express from "express";
import {
  userLoginController,
  userRegController,
  verifyEmailController,
} from "../controller/authController.js";
import {
  validateLogin,
  validateRegister,
  validateVerifyEmail,
} from "../validation/validateAuth.js";
import { handleValidation } from "../middleware/handleValidation.js";

const auth = express.Router();

auth.post("/login", validateLogin, handleValidation, userLoginController);
auth.post("/sign-up", validateRegister, handleValidation, userRegController);
auth.post(
  "/verify-email-user",
  validateVerifyEmail,
  handleValidation,
  verifyEmailController
);

export default auth;
