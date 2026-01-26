"use client";

import { Project } from "@/interface/projects";
import {
  deleteProjectAction,
  updateProjectAction,
} from "@/lib/actions/projects";
import { FormDataProject } from "@/lib/schema/projects";
import { useAuthStore } from "@/stores/users.store";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import DeleteDialog from "../utils/DeleteDialog";
import ProjectDialog from "./ProjectDialog";

export default function ProjectList({
  onFetchData,
  projects,
}: {
  onFetchData: () => void;
  projects: Project[];
}) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const role = useAuthStore((s) => s.user?.role.role_name);

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteProjectAction(id);
      if (res.status) {
        toast.success("Project deleted!");
        onFetchData();
      }
    } catch (err) {
      toast.error("Delete project failed");
    }
  };

  const handleUpdateSubmit = async (data: FormDataProject) => {
    if (!selectedProject) return;
    try {
      const res = await updateProjectAction(selectedProject.id, data);
      if (res.status) {
        toast.success("Project updated!");
        setOpenUpdate(false);
        setSelectedProject(null);
        onFetchData();
      }
    } catch {
      toast.error("Update failed");
    }
  };

  const visibleAction = (role: string, p: Project) => {
    if (role === "admin") {
      return (
        <>
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
        </>
      );
    } else if (role === "manager") {
      return (
        <>
          <Link href={`/manager/tasks/${p.id}`}>
            <button className="text-amber-500 hover:underline cursor-pointer">
              View
            </button>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <button className="text-red-800">Error</button>
        </>
      );
    }
  };

  if (projects.length === 0)
    return <p className="text-center font-bold">No projects found</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
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
                <td className="border px-4 py-2">{visibleAction(role!, p)}</td>
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
    </div>
  );
}
