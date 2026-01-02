import express from "express";
import {
  getProfileController,
  resendOtpController,
  userLoginController,
  userLogoutController,
  userRegController,
  verifyEmailController,
} from "../controller/authController.js";
import {
  validateLogin,
  validateRegister,
  validateVerifyEmail,
} from "../validation/validateAuth.js";
import { handleValidation } from "../middleware/handleValidation.js";
import { authenticate } from "../middleware/authentication.js";

const auth = express.Router();

auth.post("/login", validateLogin, handleValidation, userLoginController);
auth.get("/log-out", authenticate, userLogoutController);
auth.post("/sign-up", validateRegister, handleValidation, userRegController);
auth.post("/resend-otp", handleValidation, resendOtpController);
auth.post(
  "/verify-email-user",
  validateVerifyEmail,
  handleValidation,
  verifyEmailController
);
auth.get("/profile", authenticate, getProfileController);

export default auth;
