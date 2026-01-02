"use client";

import { getProfileApi } from "@/api/auth";
import { useAuthStore } from "@/stores/users.store";
import { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);

  useEffect(() => {
    getProfileApi()
      .then((res) => setUser(res.result))
      .catch(() => clearUser());
  }, []);

  return <>{children}</>;
}
