import projectsModel from "../model/projectsModel.js";

export const getAllProjectsService = async (filters) => {
  try {
    const allProjects = await projectsModel.findAll({});
    return allProjects;
  } catch (error) {
    throw error;
  }
};

export const createProjectsService = async (data) => {
  try {
    const newProject = await projectsModel.create({
      name: data.name,
      description: data.description,
      status: data.status,
      owner_id: data.id,
    });
    return newProject;
  } catch (error) {
    throw error;
  }
};

export const updateProjectsService = async (id, data) => {
  try {
    const project = await projectsModel.findByPk(id);
    if (!project) {
      return null;
    }
    await projectsModel.update({
      name: data.name,
      description: data.description,
      status: data.status,
    });
    return project;
  } catch (error) {
    throw error;
  }
};

export const deleteProjectsService = async (id) => {
  try {
    const project = await projectsModel.findByPk(id);
    if (!project) {
      return null;
    }
    await projectsModel.destroy({ where: { id: id } });
    return project;
  } catch (error) {
    throw error;
  }
};

export const deleteAllProjectsService = async () => {
  try {
    const deletedCount = await projectsModel.destroy({ where: {} });
    return deletedCount;
  } catch (error) {
    throw error;
  }
};
