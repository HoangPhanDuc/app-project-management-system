"use client";

import ProjectList from "@/components/projects/ProjectList";
import Loading from "@/components/utils/Loading";
import { Project } from "@/interface/projects";
import { getAllProjectsAction } from "@/lib/actions/projects";
import { Suspense, useEffect, useState } from "react";

export default function page() {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    const res = await getAllProjectsAction();
    if (res.status) setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <ProjectList projects={projects} onFetchData={fetchProjects} />
    </Suspense>
  );
}
