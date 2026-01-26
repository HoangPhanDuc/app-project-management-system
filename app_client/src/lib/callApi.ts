"use server";

import { cookies } from "next/headers";

const API_URL = process.env.API_BASE_URL!;
const API_URL_APP = process.env.APP_BASE_URL!;

let refreshingPromise: Promise<string | null> | null = null;

export async function callApi(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const buildCookieHeader = (overrideAccessToken?: string) => {
    const allCookies = cookieStore.getAll();
    const updatedCookies = allCookies.map((c) => {
      if (c.name === "accessToken" && overrideAccessToken) {
        return `${c.name}=${overrideAccessToken}`;
      }
      return `${c.name}=${c.value}`;
    });

    const hasToken = allCookies.some((c) => c.name === "accessToken");
    if (!hasToken && overrideAccessToken) {
      updatedCookies.push(`accessToken=${overrideAccessToken}`);
    }

    return updatedCookies.join("; ");
  };

  const buildHeaders = (
    extra?: Record<string, string>,
    overrideToken?: string,
  ) => {
    const headers = new Headers(options.headers);

    if (!(options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    if (extra) {
      for (const [key, value] of Object.entries(extra)) {
        headers.set(key, value);
      }
    }

    return {
      ...Object.fromEntries(headers.entries()),
      Cookie: buildCookieHeader(overrideToken),
    };
  };

  const doFetch = (
    extraHeaders?: Record<string, string>,
    overrideToken?: string,
  ) =>
    fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: buildHeaders(extraHeaders, overrideToken),
      cache: "no-store",
    });

  let res = await doFetch();

  if (res.status === 401 && !endpoint.includes("refresh-token")) {
    if (!refreshingPromise) {
      refreshingPromise = (async () => {
        const refreshRes = await fetch(`${API_URL_APP}/api/auth/refresh`, {
          method: "POST",
          headers: {
            Cookie: cookieStore.toString(),
          },
          cache: "no-store",
        });

        if (!refreshRes.ok) return null;
        const data = await refreshRes.json();
        return data.accessToken as string;
      })();
    }

    const newAccessToken = await refreshingPromise;
    refreshingPromise = null;

    if (!newAccessToken) return res;

    res = await doFetch({}, newAccessToken);
  }

  return res;
}
