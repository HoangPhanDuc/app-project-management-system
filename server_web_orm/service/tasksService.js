import tasksModel from "../model/tasksModel.js";

export const createTasksService = async (data) => {
  try {
    const result = await tasksModel.create(data);
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
    const result = await task.update(data);
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
    const result = await task.destroy();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getTasksByIdService = async (id) => {
  try {
    const task = await tasksModel.findByPk(id);
    if (!task) {
      return null;
    }
    return task;
  } catch (error) {
    throw error;
  }
};

export const getAllTasksService = async () => {
  try {
    const tasks = await tasksModel.findAll({});
    return tasks;
  } catch (error) {
    throw error;
  }
};
