const API_URL = "http://localhost:3001/api/v1";

type FetchOptions = RequestInit & {
  params?: Record<string, string | number>;
};

export async function apiFetch(endpoint: string, options: FetchOptions = {}) {
  let url = API_URL + endpoint;

  if (options.params) {
    const qs = new URLSearchParams(
      Object.entries(options.params).map(([k, v]) => [k, String(v)])
    );
    url += `?${qs.toString()}`;
  }

  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw error ?? new Error("API Error");
  }

  return res.json();
}
