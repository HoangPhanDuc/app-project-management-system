import { getAuthUser, redirectByRole } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function MemberLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getAuthUser();

  if (!user) redirect("/sign-in");

  if (user.role.role_name !== "member") {
    redirectByRole(user);
  }

  return <>{children}</>;
}
