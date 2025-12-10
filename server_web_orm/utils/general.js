import crypto from "crypto";

// generate OTP
export const generateOTP = (length = 6) => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += crypto.randomInt(0, 10);
  }
  return otp;
};

// pending email store
export const pendingUsers = new Map();
