import tasksModel from "../model/tasksModel";

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

