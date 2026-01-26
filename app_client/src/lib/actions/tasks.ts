"use server";

import { callApi } from "../callApi";

export const getTasksByProjectId = async (projectId: string) => {
  const id = encodeURIComponent(projectId);
  const res = await callApi(`/tasks/get-task-by-projects/${id}`, {
    method: "GET",
  });
  const data = await res.json();
  return data.result;
};

// export const createTaskApi = async (taskData: {
//   title: string;
//   description: string;
//   status: string;
//   projectId: string;
//   priority: string;
//   deadline: string;
//   start_date: string;
//   assigned_to: string;
//   created_by: string;
// }) => {
//   try {
//     const response = await apiFetch1("/tasks/create-task", {
//       method: "POST",
//       body: JSON.stringify(taskData),
//     });
//     return response;
//   } catch (error: any) {
//     throw error;
//   }
// };

// export const updateTaskApi = async (
//   taskId: number,
//   taskData: {
//     title: string;
//     description: string;
//     status: string;
//     projectId: string;
//     priority: string;
//     deadline: string;
//     start_date: string;
//     assigned_to: string;
//     created_by: string;
//   },
// ) => {
//   try {
//     const response = await apiFetch1(`/tasks/update-task/${taskId}`, {
//       method: "PATCH",
//       body: JSON.stringify(taskData),
//     });
//     return response;
//   } catch (error: any) {
//     throw error;
//   }
// };
