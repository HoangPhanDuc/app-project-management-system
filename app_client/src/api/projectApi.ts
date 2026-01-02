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
