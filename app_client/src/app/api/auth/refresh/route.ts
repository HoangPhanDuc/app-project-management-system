import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = process.env.API_BASE_URL!;

export async function POST() {
  const cookieStore = await cookies();
  const res = await fetch(`${API_URL}/refresh-token`, {
    method: "POST",
    headers: { Cookie: cookieStore.toString() },
  });

  if (!res.ok) {
    const response = NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  const { accessToken, expiresIn } = await res.json();

  const response = NextResponse.json({ ok: true, accessToken });
  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: expiresIn ?? 900,
    sameSite: "lax",
  });

  return response;
}
