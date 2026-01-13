import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4">Page not found or no permission</p>

      <Link href="/" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded">
        Go home
      </Link>
    </div>
  );
}
