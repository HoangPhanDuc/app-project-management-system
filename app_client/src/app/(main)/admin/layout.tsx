import { getProfileAction } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getProfileAction();

  if (!user) redirect("/sign-in");

  if (user.role.role_name !== "admin") {
    redirect(`/${user.role.role_name}`);
  }

  return <>{children}</>;
}
