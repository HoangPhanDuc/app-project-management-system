import { param } from "express-validator";

export const validateIdParam = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isString()
    .withMessage("ID must be a string"),
];
