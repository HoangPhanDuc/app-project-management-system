import {
  createProjectsService,
  deleteAllProjectsService,
  deleteProjectsService,
  getAllProjectsService,
  getOneProjectService,
  updateProjectsService,
} from "../service/projectsService.js";

export const getAllProjectsController = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const cursor = req.query.cursor ? Number(req.query.cursor) : null;

    const projects = await getAllProjectsService({ cursor, limit });

    const nextCursor =
      projects.length > 0 ? projects[projects.length - 1].id : null;

    res.status(200).json({
      status: true,
      result: projects,
      nextCursor,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const getOneProjectController = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await getOneProjectService(id);
    if (!project) {
      return res.status(404).json({ status: false, mess: "Project not found" });
    }
    return res.status(200).json({ status: true, result: project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: "Server error" });
  }
};

export const createProjectsController = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const { id } = req.user;

    const result = await createProjectsService({
      name,
      description,
      status,
      id,
    });
    return res.status(201).json({
      status: true,
      mess: "Created project successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: "Server error" });
  }
};

export const updateProjectsController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;
    const result = await updateProjectsService(id, {
      name,
      description,
      status,
    });
    if (!result) {
      return res
        .status(404)
        .json({ status: false, mess: "Can not find and update project" });
    }
    return res.status(200).json({
      status: true,
      mess: "Updated project successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: "Server error" });
  }
};

export const deleteProjectsController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteProjectsService(id);
    if (!result) {
      return res
        .status(404)
        .json({ status: false, mess: "Can not find and delete project" });
    }
    return res.status(200).json({
      status: true,
      mess: "Deleted project successfully!",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: "Server error" });
  }
};

export const deleteAllProjectsController = async (req, res) => {
  try {
    const result = await deleteAllProjectsService();
    return res.status(200).json({
      status: true,
      mess: "Deleted all projects successfully!",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: "Server error" });
  }
};
