"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8 py-16 px-8 bg-white dark:bg-black sm:items-start sm:py-32">
        {/* Logo */}
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={120}
          height={30}
          priority
        />

        {/* Welcome message */}
        <div className="flex flex-col items-center gap-4 text-center sm:items-start sm:text-left">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
            Welcome to Project Management System
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Manage your projects, tasks, and teams efficiently. Get started by
            logging in or signing up.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/login"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700 md:w-[150px]"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-black/[.08] transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[150px]"
          >
            Sign Up
          </Link>
        </div>
      </main>
    </div>
  );
}
