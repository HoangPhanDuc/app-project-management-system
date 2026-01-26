import { verifyToken } from "../utils/handletoken.js";

export const authenticate = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    return res.status(401).json({ message: "Access token missing" });
  }

  try {
    const decoded = verifyToken(accessToken);
    req.user = decoded;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(403).json({ message: "Invalid token" });
  }
};

export const authorize =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user?.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You don't have permission",
      });
    }
    return next();
  };
