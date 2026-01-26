import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/", "/sign-in", "/sign-up", "/verify-code"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  const isPublic = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(path + "/"),
  );

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (token && PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const response = NextResponse.next();
  if (!isPublic) {
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
