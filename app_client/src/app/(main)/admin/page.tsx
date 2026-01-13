"use client";

import {
  createProjectApi,
  deleteAllProjectsApi,
  getAllProjectsApi,
} from "@/api/projectApi";
import ProjectDialog from "@/components/projects/ProjectDialog";
import ProjectList from "@/components/projects/ProjectList";
import DeleteDialog from "@/components/utils/DeleteDialog";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Project = {
  id: number;
  name: string;
  description: string;
  status: "active" | "completed" | "archived";
};

export default function DashboardAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    const res = await getAllProjectsApi();
    if (res.status) setProjects(res.result);
    setLoading(false);
  };

  const handleCreateProject = async (data: {
    name: string;
    description: string;
    status: "active" | "completed" | "archived";
  }) => {
    const res = await createProjectApi(data);
    if (res.status) {
      toast.success("Project created successfully!");
      setOpenCreate(false);
      fetchProjects();
    }
  };

  const handleDeleteAllProjects = async () => {
    const res = await deleteAllProjectsApi();
    if (res.status) {
      toast.success("All projects deleted!");
      setProjects([]);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4 text-center">
        Dashboard Admin Page
      </h1>

      <div className="flex justify-end mb-4 gap-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white cursor-pointer"
          onClick={() => setOpenCreate(true)}
        >
          Create Project
        </button>

        <DeleteDialog
          trigger={
            <button className="bg-red-600 text-white py-2 px-4 cursor-pointer">
              Delete All
            </button>
          }
          title="Delete All Projects"
          description="Are you sure you want to delete all projects?"
          onConfirm={handleDeleteAllProjects}
        />
      </div>

      <ProjectList
        projects={projects}
        loading={loading}
        onFetchData={fetchProjects}
      />

      <ProjectDialog
        mode="create"
        open={openCreate}
        onOpenChange={setOpenCreate}
        onSubmit={handleCreateProject}
      />
    </div>
  );
}
