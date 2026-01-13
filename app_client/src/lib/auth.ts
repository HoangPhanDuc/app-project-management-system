import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getAuthUser() {
  const headersList = await headers();
  const cookieHeader = headersList.get("cookie");

  if (!cookieHeader) return null;

  const res = await fetch(`${process.env.API_URL}/me`, {
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.result || null;
}

export function redirectByRole(user: any) {
  if (!user) redirect("/sign-in");

  switch (user.role?.role_name) {
    case "admin":
      redirect("/admin");
    case "manager":
      redirect("/manager");
    case "member":
      redirect("/member");
    default:
      redirect("/");
  }
}
