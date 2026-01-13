"use client";

import { deleteProjectApi, updateProjectApi } from "@/api/projectApi";
import { useState } from "react";
import toast from "react-hot-toast/headless";
import DeleteDialog from "../utils/DeleteDialog";
import ProjectDialog, { FormDataProject } from "./ProjectDialog";
import Loading from "../utils/Loading";

type Project = {
  id: number;
  name: string;
  description: string;
  status: "active" | "completed" | "archived";
};

export default function ProjectList({
  onFetchData,
  projects,
  loading,
}: {
  onFetchData: () => void;
  projects: Project[];
  loading: boolean;
}) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleDelete = async (id: number) => {
    const res = await deleteProjectApi(id);
    if (res.status) {
      toast.success("Project deleted!");
      onFetchData();
    }
  };

  const handleUpdateSubmit = async (data: FormDataProject) => {
    if (!selectedProject) return;

    const res = await updateProjectApi(selectedProject.id, data);
    if (res.status) {
      toast.success("Project updated!");
      setOpenUpdate(false);
      setSelectedProject(null);
      onFetchData();
    }
  };

  if (loading) return <Loading />;
  if (projects.length === 0)
    return <p className="text-center font-bold">No projects found</p>;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, index) => (
              <tr key={p.id} className="text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2 font-medium">{p.name}</td>
                <td className="border px-4 py-2">{p.description}</td>
                <td className="border px-4 py-2">{p.status}</td>
                <td className="border px-4 py-2">
                  <button
                    className="text-blue-500 hover:underline cursor-pointer"
                    onClick={() => {
                      setSelectedProject(p);
                      setOpenUpdate(true);
                    }}
                  >
                    Update
                  </button>

                  <DeleteDialog
                    trigger={
                      <button className="ml-2 text-red-500 hover:underline cursor-pointer">
                        Delete
                      </button>
                    }
                    title="Delete Project"
                    description={`Delete "${p.name}"?`}
                    onConfirm={() => handleDelete(p.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProjectDialog
        mode="update"
        open={openUpdate}
        onOpenChange={setOpenUpdate}
        initialData={
          selectedProject
            ? {
                name: selectedProject.name,
                description: selectedProject.description,
                status: selectedProject.status,
              }
            : undefined
        }
        onSubmit={handleUpdateSubmit}
      />
    </>
  );
}
