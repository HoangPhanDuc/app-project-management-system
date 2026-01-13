import { apiFetch } from "./apiFetch";

export const getAllProjectsApi = async () => {
  try {
    const res = await apiFetch("/projects/get-all-projects", {
      method: "GET",
    });
    return res;
  } catch (error: any) {
    throw error;
  }
};

export const getOneProjectApi = async (id: number) => {
  try {
    const res = await apiFetch(`/projects/get-project/${id}`, {
      method: "GET",
    });
    return res;
  } catch (error: any) {
    throw error;
  }
};

export const createProjectApi = async (projectData: {
  name: string;
  description: string;
  status: "active" | "completed" | "archived";
}) => {
  try {
    const res = await apiFetch("/projects/create-project", {
      method: "POST",
      body: JSON.stringify(projectData),
    });
    return res;
  } catch (error: any) {
    throw error;
  }
};

export const updateProjectApi = async (
  id: number,
  data: {
    name: string;
    description: string;
    status: "active" | "completed" | "archived";
  }
) => {
  try {
    const res = await apiFetch(`/projects/update-project/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteProjectApi = async (projectId: number) => {
  try {
    const res = await apiFetch(`/projects/delete-project/${projectId}`, {
      method: "DELETE",
    });
    return res;
  } catch (error: any) {
    throw error;
  }
};

export const deleteAllProjectsApi = async () => {
  try {
    const res = await apiFetch("/projects/delete-all-projects", {
      method: "DELETE",
    });
    return res;
  } catch (error: any) {
    throw error;
  }
};
