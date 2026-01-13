"use client";

import { getProfileApi } from "@/api/auth";
import { useAuthStore } from "@/stores/users.store";
import { useEffect } from "react";

export default function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser?: any;
}) {
  const { setUser, setError, setIsLoading } = useAuthStore();

  useEffect(() => {
    let active = true;

    async function initAuth() {
      setIsLoading(true);

      try {
        if (initialUser) {
          if (active) setUser(initialUser);
          return;
        }

        const res = await getProfileApi();
        if (active) {
          setUser(res?.result ?? null);
          setError(null);
        }
      } catch (err: any) {
        if (active) {
          setUser(null);
          setError(err?.message ?? "Auth error");
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }

    initAuth();
    return () => {
      active = false;
    };
  }, [initialUser, setUser, setError, setIsLoading]);

  return <>{children}</>;
}
