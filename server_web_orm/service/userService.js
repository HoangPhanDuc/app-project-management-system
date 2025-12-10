import rolesModel from "../model/rolesModel.js";
import usersModel from "../model/usersModel.js";

export const getAllUsersService = async () => {
  try {
    const getAllUsers = await usersModel.findAll({});
    return getAllUsers;
  } catch (error) {
    throw error;
  }
};

export const getUserByIdService = async (id) => {
  try {
    const getUserById = await usersModel.findByPk(id);
    return getUserById;
  } catch (error) {
    throw error;
  }
};

export const deleteUserService = async (id) => {
  try {
    const deletedUser = await usersModel.destroy({
      where: { id: id },
    });
    return deletedUser;
  } catch (error) {
    throw error;
  }
};

// ---------------------------------------------------
export const userLoginService = async (email) => {
  try {
    const dataUser = await usersModel.findOne({
      where: { email: email },
      attributes: { exclude: ["role_id"] },
      include: [
        {
          model: rolesModel,
          attributes: ["role_name"],
        },
      ],
    });
    return dataUser.dataValues;
  } catch (error) {
    throw error;
  }
};

export const validateUserService = async (email) => {
  try {
    const validateUser = await usersModel.findOne({
      where: { email: email },
    });
    return validateUser;
  } catch (error) {
    throw error;
  }
};

export const registerUserService = async (name, email, password, roleId) => {
  try {
    const registerUser = await usersModel.create({
      name: name,
      email: email,
      password: password,
      role_id: roleId,
    });
    return registerUser;
  } catch (error) {
    throw error;
  }
};

export const saveRefreshTokenService = async (token, id) => {
  try {
    const saveRefreshToken = await usersModel.update(
      { refresh_token: token },
      { where: { id: id } }
    );
    return saveRefreshToken;
  } catch (error) {
    throw error;
  }
};

export const refreshTokenService = async (id, token) => {
  try {
    const newRefreshToken = await usersModel.update(
      {
        refresh_token: token,
      },
      { where: { id: id } }
    );
    return newRefreshToken;
  } catch (error) {
    throw error;
  }
};
