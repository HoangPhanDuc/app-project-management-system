import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    req.user = decoded;

    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ success: false, message: "Token expired" });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ success: false, message: "Invalid token" });
    }

    console.error("JWT Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal authentication error" });
  }
};

export const authorize =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You don't have permission",
      });
    }
    return next();
  };
