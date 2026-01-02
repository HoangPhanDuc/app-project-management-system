"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/users.store";

export default function NotFoundPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const handleGoHome = () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }

    switch (user.role.role_name) {
      case "admin":
        router.replace("/admin");
        break;
      case "manager":
        router.replace("/manager");
        break;
      case "member":
        router.replace("/member");
        break;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8 text-center">
        The page you are looking for does not exist or you don't have
        permission.
      </p>
      <button
        onClick={handleGoHome}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
