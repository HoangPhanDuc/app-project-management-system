import {
  createTasksService,
  deleteTasksService,
  getAllTasksService,
  getTasksByIdService,
  updateTasksService,
} from "../service/tasksService.js";

export const createTaskController = async (req, res) => {
  try {
    const taskData = req.body;
    const result = await createTasksService(taskData);
    return res.status(201).json({
      status: true,
      mess: "Created task successfully!",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: "Server error" });
  }
};

export const updateTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const taskData = req.body;
    const result = await updateTasksService(id, taskData);
    if (!result) {
      return res
        .status(404)
        .json({ status: false, mess: "Can not find and update task" });
    }
    return res.status(200).json({
      status: true,
      mess: "Updated task successfully!",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: "Server error" });
  }
};

export const getTasksByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getTasksByIdService(id);
    if (!result) {
      return res.status(404).json({
        status: false,
        mess: "Task not found",
      });
    }
    return res.status(200).json({
      status: true,
      mess: "Retrieved task successfully!",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: "Server error" });
  }
};

export const getAllTasksController = async (req, res) => {
  try {
    const result = await getAllTasksService();
    return res.status(200).json({
      status: true,
      mess: "Retrieved all tasks successfully!",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: "Server error" });
  }
};

export const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteTasksService(id);
    if (!result) {
      return res
        .status(404)
        .json({ status: false, mess: "Can not find and delete task" });
    }
    return res.status(200).json({
      status: true,
      mess: "Deleted task successfully!",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: "Server error" });
  }
};
