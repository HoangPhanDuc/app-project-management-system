"use client";

type Project = {
  id: number;
  name: string;
  description: string;
  status: "active" | "completed" | "archived";
};

export default function ProjectList({
  projects,
  loading,
}: {
  projects: Project[];
  loading: boolean;
}) {
  if (loading) {
    return <p className="text-center">Loading projects...</p>;
  }

  if (projects.length === 0) {
    return <p className="text-center">No projects found</p>;
  }

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id} className="text-center">
              <td className="border px-4 py-2">{p.id}</td>
              <td className="border px-4 py-2 font-medium">{p.name}</td>
              <td className="border px-4 py-2">{p.description}</td>
              <td className="border px-4 py-2">{p.status}</td>
              <td className="border px-4 py-2">
                <button className="text-blue-500 hover:underline">Edit</button>
                <button className="text-red-500 hover:underline ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
