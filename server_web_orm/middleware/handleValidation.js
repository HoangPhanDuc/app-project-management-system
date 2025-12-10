import { validationResult } from "express-validator";

export const handleValidation = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({ error: error.array() });
  }
  next();
};

export const validateFileExistence = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ mess: "File is required!" });
  }
  next();
};
