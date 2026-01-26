"use server";

import { callApi } from "../callApi";

export const getAllProjectsAction = async () => {
  const res = await callApi("/projects/get-all-projects", {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  const data = await res.json();
  return { status: true, data: data.result };
};

export const getOneProjectAction = async (projectId: number) => {
  const id = encodeURIComponent(projectId);
  const res = await callApi(`/projects/get-project/${id}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch project");
  }

  const data = await res.json();
  return { status: true, data: data.result };
};

export const createProjectAction = async (projectData: {
  name: string;
  description: string;
  status: "active" | "completed" | "archived";
}) => {
  const res = await callApi("/projects/create-project", {
    method: "POST",
    body: JSON.stringify(projectData),
  });

  if (!res.ok) {
    throw new Error("Create project failed");
  }

  return { status: true };
};

export const updateProjectAction = async (
  projectId: number,
  data: {
    name: string;
    description: string;
    status: "active" | "completed" | "archived";
  },
) => {
  const id = encodeURIComponent(projectId);
  const res = await callApi(`/projects/update-project/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Update project failed");
  }

  return { status: true };
};

export const deleteProjectAction = async (projectId: number) => {
  const id = encodeURIComponent(projectId);
  const res = await callApi(`/projects/delete-project/${id}`, {
    method: "DELETE",
  });
  console.log(res);
  if (!res.ok) {
    throw new Error("Delete project failed");
  }
  return { status: true };
};

export const deleteAllProjectsAction = async () => {
  const res = await callApi("/projects/delete-all-projects", {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Delete all projects failed");
  }
  return { status: true };
};
