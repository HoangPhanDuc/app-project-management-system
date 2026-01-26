import { body } from "express-validator";

export const createTaskValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ max: 255 })
    .withMessage("Title is too long"),
  body("description")
    .optional()
    .trim()
    .isString()
    .isLength({ max: 1000 })
    .withMessage("Description isn't more than 1000 characters"),
  body("status")
    .optional()
    .isIn(["to-do", "in-progress", "done"])
    .withMessage("Invalid status"),
  body("priority").optional().isIn(["low", "medium", "high"]),
  body("project_id").optional().isInt(),
  body("assigned_to").optional().isInt(),
  body("deadline").optional().isISO8601(),
  body("start_date").optional().isISO8601(),
  body("created_by").not().exists().withMessage("Created by cannot be used"),
];

export const updateTaskValidator = [
  body("title")
    .optional()
    .trim()
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 1 })
    .withMessage("Title cannot be empty"),
  body("description").optional().trim().isString(),
  body("status")
    .optional()
    .isIn(["to-do", "in-progress", "done"])
    .withMessage("Invalid status"),
  body("priority").optional().isIn(["low", "medium", "high"]),
  body("project_id").optional().isInt(),
  body("assigned_to").optional().isInt(),
  body("deadline").optional().isISO8601(),
  body("start_date").optional().isISO8601(),
  body("created_by").not().exists().withMessage("Created by cannot be used"),
];
