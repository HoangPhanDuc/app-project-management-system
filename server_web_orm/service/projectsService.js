import { Op } from "sequelize";
import projectsModel from "../model/projectsModel.js";

export const getAllProjectsService = async ({ cursor, limit }) => {
  try {
    const allProjects = await projectsModel.findAll({
      where: cursor ? { id: { [Op.lt]: cursor } } : {},
      limit,
      order: [["id", "DESC"]],
    });
    return allProjects;
  } catch (error) {
    throw error;
  }
};

export const getOneProjectService = async (id) => {
  try {
    const project = await projectsModel.findByPk(id);
    return project;
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
    // update only the found instance to avoid accidental mass-updates
    await project.update({
      name: data.name ?? project.name,
      description: data.description ?? project.description,
      status: data.status ?? project.status,
    });
    // reload to get latest values and return
    await project.reload();
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
