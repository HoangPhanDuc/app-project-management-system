export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
      <p className="text-sm text-gray-500">Loading...</p>
    </div>
  );
}
