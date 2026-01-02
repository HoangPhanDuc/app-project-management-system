import { check } from "express-validator";

export const validateLogin = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const validateRegister = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  check("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["admin", "manager", "member"])
    .withMessage("Role must be required"),
];

export const validateVerifyEmail = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  check("otp")
    .notEmpty()
    .withMessage("OTP is required")
    .isNumeric(6)
    .withMessage("OTP must be a 6-digit number"),
];

export const validatorAddUser = [
  check("users_name").notEmpty().withMessage("Name is required"),
  check("phone").isMobilePhone().withMessage("Phone number is invalid"),
  check("address").notEmpty().withMessage("Address is required"),
];
