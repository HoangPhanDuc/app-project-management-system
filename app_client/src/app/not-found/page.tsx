import { useAuthStore } from "@/stores/users.store";
import Link from "next/link";

const user_role = useAuthStore.getState().user?.role?.role_name;

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4">Page not found or no permission</p>

      <Link
        href={`/${user_role}`}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded"
      >
        Go home
      </Link>
    </div>
  );
}
