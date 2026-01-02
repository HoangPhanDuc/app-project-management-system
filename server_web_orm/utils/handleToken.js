import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const secretKey = process.env.SECRET_KEY;
const refreshKey = process.env.REFRESH_KEY;

export const createAccessToken = (payload) => {
  const accessToken = jwt.sign(
    { id: payload.id, role: payload.role },
    secretKey,
    { expiresIn: "15m" }
  );
  return accessToken;
};

export const verifyToken = (token) => {
  const dec = jwt.verify(token, secretKey);
  return dec;
};

export const verifyRefreshToken = (token) => {
  const dec = jwt.verify(token, refreshKey);
  return dec;
};

export const createRefreshToken = (payload) => {
  const refreshToken = jwt.sign(
    { id: payload.id, role: payload.role },
    refreshKey,
    { expiresIn: "7d" }
  );
  return refreshToken;
};

export const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

export const comparePassword = (pass, hashPass) => {
  const handlePassword = bcrypt.compareSync(pass, hashPass);
  return handlePassword;
};

export const hashingPassword = (pass) => {
  const hashPass = bcrypt.hashSync(pass, 10);
  return hashPass;
};
