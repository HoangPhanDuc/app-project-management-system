"use client";

import { logOutAction } from "@/lib/actions/auth";
import { useAuthStore } from "@/stores/users.store";
import { User } from "lucide-react";
import Image from "next/image";
import { startTransition, useState } from "react";
import toast from "react-hot-toast";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);

  const logOut = async () => {
    clearUser();
    setIsOpen(false);
    startTransition(async () => {
      try {
        await logOutAction();
      } catch (error: any) {
        const isRedirectError =
          error?.message === "NEXT_REDIRECT" ||
          error?.digest?.includes("NEXT_REDIRECT");
        if (!isRedirectError) {
          toast.error("Logout failed");
        }
      }
    });
  };

  return (
    <nav className="bg-gray-800 text-gray-200 p-3 shadow-sm">
      <div className="mx-3 flex items-center justify-between">
        <div className="text-xl font-bold">PMS</div>

        <div className="relative">
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {user?.avatar_url ? (
              <Image
                src={user.avatar_url}
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </button>

          {isOpen && (
            <ul className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-800 shadow-lg rounded-lg z-10">
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer">
                Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer">
                Settings
              </li>
              <li
                onClick={logOut}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer"
              >
                Sign out
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
