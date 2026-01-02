import { apiFetch } from "@/api/apiFetch";

export const loginApi = async (email: string, password: string) => {
  try {
    const res = await apiFetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    return res;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const signUpApi = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  try {
    const res = await apiFetch("/sign-up", {
      method: "POST",
      body: JSON.stringify({ name, email, password, role }),
    });
    return res;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const verifyCodeApi = async (email: string, otp: string) => {
  try {
    const res = await apiFetch("/verify-email-user", {
      method: "POST",
      body: JSON.stringify({ email, otp }), 
    });
    return res;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const getProfileApi = async () => {
  try {
    const res = await apiFetch("/profile", {
      method: "GET",
    });
    return res;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const logOutApi = async () => {
  try {
    const res = await apiFetch("/log-out", {
      method: "GET",
      credentials: "include",
    });
    return res;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};