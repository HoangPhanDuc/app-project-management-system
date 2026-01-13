import { baseCookieOptions } from "./cookieOptions.js";

export const setLoginCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    ...baseCookieOptions(),
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    ...baseCookieOptions(),
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const setAuthCookie = (res, accessToken) => {
  res.cookie("accessToken", accessToken, {
    ...baseCookieOptions(),
    maxAge: 15 * 60 * 1000,
  });
};
