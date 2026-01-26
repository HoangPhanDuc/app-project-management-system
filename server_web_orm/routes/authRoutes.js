import express from "express";
import {
  getMeController,
  refreshTokenController,
  resendOtpController,
  userLoginController,
  userLogoutController,
  userRegController,
  verifyEmailController,
} from "../controller/authController.js";
import { authenticate } from "../middleware/authentication.js";
import { handleValidation } from "../middleware/handleValidation.js";
import {
  validateLogin,
  validateRegister,
  validateVerifyEmail,
} from "../validation/validateAuth.js";

const auth = express.Router();

auth.post("/login", validateLogin, handleValidation, userLoginController);
auth.get("/log-out", authenticate, userLogoutController);
auth.post("/sign-up", validateRegister, handleValidation, userRegController);
auth.post("/resend-otp", handleValidation, resendOtpController);
auth.post(
  "/verify-email-user",
  validateVerifyEmail,
  handleValidation,
  verifyEmailController,
);
auth.get("/me", authenticate, getMeController);
auth.post("/refresh-token", refreshTokenController);

export default auth;
