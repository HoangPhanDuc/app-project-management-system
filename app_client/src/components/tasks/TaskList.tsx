import { Task } from "@/interface/tasks";
import { getTasksByProjectId } from "@/lib/actions/tasks";

export default async function TaskList({ projectId }: { projectId: string }) {
  try {
    const response = await getTasksByProjectId(projectId);
    const tasks = Array.isArray(response) ? response : response?.data || [];

    if (!Array.isArray(tasks) || tasks.length === 0)
      return <p className="text-center font-bold">No tasks found</p>;

    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Task ID</th>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Priority</th>
                <th className="border px-4 py-2">Deadline</th>
                <th className="border px-4 py-2">Start Date</th>
                <th className="border px-4 py-2">Assigned To</th>
                <th className="border px-4 py-2">Created By</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task: Task, index) => (
                <tr key={task.id} className="text-center">
                  <td className="border px-4 py-2">{task.id}</td>
                  <td className="border px-4 py-2 font-medium">{task.title}</td>
                  <td className="border px-4 py-2">{task.description}</td>
                  <td className="border px-4 py-2">{task.status}</td>
                  <td className="border px-4 py-2">{task.priority}</td>
                  <td className="border px-4 py-2">
                    {new Date(task.deadline).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(task.start_date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    {task.assigned_to ? task.assigned_to : "Unassigned"}
                  </td>
                  <td className="border px-4 py-2">{task.created_by}</td>
                  <td className="border px-4 py-2">
                    <button className="mr-2 text-blue-600 hover:underline">
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } catch (error: any) {
    console.error("TaskList error:", error);
    return (
      <p className="text-center font-bold text-red-500">
        Error loading tasks: {error.message}
      </p>
    );
  }
}
