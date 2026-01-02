import jwt from "jsonwebtoken";
import { setAuthCookie } from "../helper/cookie.js";
import { refreshTokenService } from "../service/userService.js";
import {
  createAccessToken,
  verifyRefreshToken,
  verifyToken,
} from "../utils/handletoken.js";

export const authenticate = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  if (accessToken) {
    try {
      const decoded = verifyToken(accessToken);
      req.user = decoded;
      return next();
    } catch (error) {
      if (!(error instanceof jwt.TokenExpiredError)) {
        return res.status(403).json({ message: "Invalid access token" });
      }
    }
  }

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }
  try {
    const decodedRefresh = verifyRefreshToken(refreshToken);

    const isValid = await refreshTokenService(decodedRefresh.id, refreshToken);
    if (!isValid) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = createAccessToken({
      id: decodedRefresh.id,
      role: decodedRefresh.role,
    });

    setAuthCookie(res, newAccessToken);

    req.user = decodedRefresh;
    return next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
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
