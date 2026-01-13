import { setLoginCookies } from "../helper/cookie.js";
import {
  getUserByIdService,
  registerUserService,
  saveRefreshTokenService,
  userLoginService,
  validateUserService,
} from "../service/userService.js";
import { generateOTP, pendingUsers } from "../utils/general.js";
import {
  comparePassword,
  createAccessToken,
  createRefreshToken,
  hashingPassword,
} from "../utils/handletoken.js";
import { sendVerificationEmail } from "../utils/mailer.js";

export const userLoginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userLoginService(email);
    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid your account!" });
    }

    const checkUser = comparePassword(password, user.password);
    if (!checkUser) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid your password!" });
    }

    const accessToken = createAccessToken({
      id: user.id,
      role: user.role?.role_name,
    });
    const refreshToken = createRefreshToken({
      id: user.id,
      role: user.role?.role_name,
    });

    await saveRefreshTokenService(refreshToken, user.id);
    const newUser = { ...user };
    delete newUser.password;

    setLoginCookies(res, accessToken, refreshToken);

    return res.status(200).json({
      status: true,
      message: "User login successful!",
      result: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occurred", error });
  }
};

export const getMeController = async (req, res) => {
  try {
    const user = await getUserByIdService(req.user.id);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "User retrieved successfully",
      result: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Error occurred",
      error,
    });
  }
};

export const userLogoutController = async (req, res) => {
  try {
    await saveRefreshTokenService(null, req.user.id);
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res
      .status(200)
      .json({ status: true, message: "User logged out successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Logout failed",
      error,
    });
  }
};

export const userRegController = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await validateUserService(email);
    if (existingUser) {
      return res.status(409).json({
        status: false,
        message: "Email has been registered!",
      });
    }

    if (pendingUsers.has(email)) {
      const pendingUser = pendingUsers.get(email);

      if (pendingUser.lastSent && Date.now() - pendingUser.lastSent < 60_000) {
        return res.status(429).json({
          status: false,
          message: "Please wait before requesting another OTP",
        });
      }

      let otpCode = pendingUser.otpCode;
      let otpExpires = pendingUser.otpExpires;

      if (new Date() > otpExpires) {
        otpCode = generateOTP();
        otpExpires = new Date(Date.now() + 15 * 60 * 1000);
      }

      pendingUsers.set(email, {
        ...pendingUser,
        otpCode,
        otpExpires,
        attempts: 0,
        lastSent: Date.now(),
      });

      await sendVerificationEmail(email, otpCode);

      return res.status(200).json({
        status: true,
        message: "OTP sent. Please check your email.",
      });
    }

    const hashedPassword = hashingPassword(password);
    const otpCode = generateOTP();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000);

    let roleId;
    switch (role) {
      case "admin":
        roleId = 1;
        break;
      case "manager":
        roleId = 2;
        break;
      default:
        roleId = 3;
    }

    pendingUsers.set(email, {
      name,
      email,
      hashedPassword,
      roleId,
      otpCode,
      otpExpires,
      attempts: 0,
      lastSent: Date.now(),
    });

    await sendVerificationEmail(email, otpCode);

    return res.status(200).json({
      status: true,
      message: "OTP sent. Please check your email to verify your account.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};

export const resendOtpController = async (req, res) => {
  const { email } = req.body;

  try {
    const pendingUser = pendingUsers.get(email);
    if (!pendingUser) {
      return res.status(404).json({
        status: false,
        message: "No pending verification found",
      });
    }

    if (pendingUser.lastSent && Date.now() - pendingUser.lastSent < 60_000) {
      return res.status(429).json({
        status: false,
        message: "Please wait before requesting another OTP",
      });
    }

    let otpCode = pendingUser.otpCode;
    let otpExpires = pendingUser.otpExpires;

    if (new Date() > otpExpires) {
      otpCode = generateOTP();
      otpExpires = new Date(Date.now() + 15 * 60 * 1000);
    }

    pendingUsers.set(email, {
      ...pendingUser,
      otpCode,
      otpExpires,
      attempts: 0,
      lastSent: Date.now(),
    });

    await sendVerificationEmail(email, otpCode);

    return res.status(200).json({
      status: true,
      message: "OTP resent successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Failed to resend OTP",
    });
  }
};

export const verifyEmailController = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const pendingUser = pendingUsers.get(email);
    if (!pendingUser) {
      return res.status(404).json({
        status: false,
        message: "No verification request found!",
      });
    }

    if (new Date() > pendingUser.otpExpires) {
      pendingUsers.delete(email);
      return res.status(400).json({
        status: false,
        message: "OTP has expired!",
      });
    }

    pendingUser.attempts += 1;
    if (pendingUser.attempts > 5) {
      pendingUsers.delete(email);
      return res.status(429).json({
        status: false,
        message: "Too many failed attempts. Please register again.",
      });
    }

    if (String(pendingUser.otpCode) !== String(otp)) {
      return res.status(400).json({
        status: false,
        message: "Invalid OTP code!",
      });
    }

    const existingUser = await validateUserService(email);
    if (existingUser) {
      pendingUsers.delete(email);
      return res.status(409).json({
        status: false,
        message: "User already registered!",
      });
    }

    await registerUserService(
      pendingUser.name,
      pendingUser.email,
      pendingUser.hashedPassword,
      pendingUser.roleId
    );

    pendingUsers.delete(email);

    return res.status(200).json({
      status: true,
      message: "Email verified and user registered!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};

// export const requestEmailVerificationController = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await findUserByEmail(email);
//     if (!user) {
//       return res.status(404).json({
//         status: false,
//         message: "User not found.",
//       });
//     }

//     const otpCode = generateOTP();
//     const otpExpires = new Date(Date.now() + 15 * 60 * 1000);

//     pendingUsers.set(email, {
//       ...user,
//       otpCode,
//       otpExpires,
//       attempts: 0,
//       lastSent: Date.now(),
//     });

//     await sendVerificationEmail(email, otpCode);

//     return res.status(200).json({
//       status: true,
//       message: "OTP sent. Please check your email to verify your account.",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       status: false,
//       message: "Internal server error.",
//     });
//   }
// };
