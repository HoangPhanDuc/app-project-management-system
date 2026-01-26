"use client";

import { getProfileAction } from "@/lib/actions/auth";
import { useAuthStore } from "@/stores/users.store";
import { useEffect, useRef } from "react";

export default function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser?: any;
}) {
  const { setUser, setError, setIsLoading } = useAuthStore();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    async function init() {
      setIsLoading(true);

      try {
        if (initialUser !== undefined) {
          setUser(initialUser);
          setError(null);
          return;
        }

        const res = await getProfileAction();
        setUser(res?.result ?? null);
        setError(null);
      } catch (err: any) {
        if (err?.message !== "NEXT_REDIRECT") {
          setUser(null);
          setError(err?.message ?? "Auth error");
        }
      } finally {
        setIsLoading(false);
      }
    }

    init();
  }, [initialUser, setUser, setError, setIsLoading]);

  return <>{children}</>;
}
