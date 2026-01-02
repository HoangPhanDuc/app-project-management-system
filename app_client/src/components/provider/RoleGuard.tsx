"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/users.store";

export function RoleGuard({
  allow,
  children,
}: {
  allow: string[];
  children: React.ReactNode;
}) {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (user && !allow.includes(user.role.role_name)) {
      router.replace("/not-found");
    }
  }, [user]);

  if (!user) return null;

  return <>{children}</>;
}
