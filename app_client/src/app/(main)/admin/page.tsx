"use client";

import { useEffect, useState } from "react";
import ProjectDialog from "@/components/projects/ProjectDialog";
import ProjectList from "@/components/projects/ProjectList";
import { RoleGuard } from "@/components/provider/RoleGuard";
import { getAllProjectsApi } from "@/api/projectApi";

type Project = {
  id: number;
  name: string;
  description: string;
  status: "active" | "completed" | "archived";
};

export default function DashboardAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    const res = await getAllProjectsApi();
    if (res.status) {
      setProjects(res.result);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <RoleGuard allow={["admin"]}>
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-xl font-bold mb-4 text-center">
          Dashboard Admin Page
        </h1>

        <div className="flex justify-end mb-4">
          <ProjectDialog onCreated={fetchProjects} />
        </div>

        <ProjectList projects={projects} loading={loading} />
      </div>
    </RoleGuard>
  );
}
