import projectsModel from "../entities/projectsModel.js";
import tasksModel from "../entities/tasksModel.js";
import usersModel from "../entities/usersModel.js";

export const createTasksService = async (data, id) => {
  try {
    const payload = {
      ...data,
      start_date: data.start_date ? new Date(data.start_date) : null,
      deadline: data.deadline ? new Date(data.deadline) : null,
      created_by: id,
    };
    const result = await tasksModel.create(payload);
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateTasksService = async (id, data) => {
  try {
    const task = await tasksModel.findByPk(id);
    if (!task) {
      return null;
    }
    if (data.created_by) {
      delete data.created_by;
    }
    const payload = {
      ...data,
      start_date: data.start_date ? new Date(data.start_date) : null,
      deadline: data.deadline ? new Date(data.deadline) : null,
    };
    const result = await task.update(payload);
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteTasksService = async (id) => {
  try {
    const task = await tasksModel.findByPk(id);
    if (!task) {
      return null;
    }
    const result = await task.destroy({ where: { id: id } });
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteAllTasksService = async () => {
  try {
    const result = await tasksModel.destroy({ where: {}, truncate: true });
    return result;
  } catch (error) {
    throw error;
  }
};

export const getTasksByIdService = async (id) => {
  try {
    const task = await tasksModel.findByPk(id, {
      attributes: {
        exclude: ["project_id", "created_by"],
      },
      include: [
        { model: usersModel, as: "creator", attributes: ["id", "name"] },
        {
          model: projectsModel,
          as: "project",
          attributes: ["id", "name", "status"],
        },
      ],
    });
    if (!task) {
      return null;
    }
    return task;
  } catch (error) {
    throw error;
  }
};

export const getTasksByProjectIdService = async (projectId) => {
  try {
    const tasks = await tasksModel.findAll({
      where: { project_id: projectId },
    });
    if (!tasks || tasks.length === 0) {
      return null;
    }
    return tasks;
  } catch (error) {
    throw error;
  }
};

// export const getAllTasksService = async () => {
//   try {
//     const tasks = await tasksModel.findAll({});
//     return tasks;
//   } catch (error) {
//     throw error;
//   }
// };
