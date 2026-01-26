"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { callApi } from "../callApi";

export async function loginAction(
  _prevState: { error?: string },
  formData: FormData,
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let role: string | undefined;

  try {
    const res = await callApi("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    const { accessToken, refreshToken } = data.result;
    role = data?.result?.role?.role_name;

    if (!accessToken || !refreshToken) {
      return { error: "Login failed: No token received" };
    }
    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 900,
      sameSite: "lax",
    });

    if (refreshToken) {
      cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
      });
    }

    return { success: true, role: role };
  } catch (err: any) {
    return { error: err.message || "Login failed" };
  }
}

export async function signUpAction(
  _prevState: { error?: string },
  formData: FormData,
) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    const res = await callApi("/sign-up", {
      method: "POST",
      body: JSON.stringify({ name, email, password, role }),
    });

    if (!res.ok) {
      return { error: "Signup failed" };
    }
    return redirect(`/verify-code?email=${encodeURIComponent(email)}`);
  } catch (error) {
    console.error("Signup error:", error);

    return {
      error: "Sign up error. Please try again later.",
    };
  }
}

export const verifyCodeAction = async (email: string, otp: string) => {
  const res = await callApi("/verify-email-user", {
    method: "POST",
    body: JSON.stringify({ email, otp }),
  });
  if (!res.ok) {
    return { error: "Verification failed" };
  }
  return { status: true };
};

export const logOutAction = async () => {
  const res = await callApi("/log-out", { method: "GET" });
  if (!res.ok) {
    return { error: "Logout failed" };
  }
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  redirect("/sign-in");
};

export const getProfileAction = async () => {
  const res = await callApi("/me", { method: "GET" });

  if (res.status === 401) {
    return null;
  }

  const data = await res.json();
  return data.result;
};
