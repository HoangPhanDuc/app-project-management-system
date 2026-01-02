import rolesModel from "../model/rolesModel.js";
import usersModel from "../model/usersModel.js";
import { hashToken } from "../utils/handletoken.js";

export const getAllUsersService = async () => {
  try {
    const getAllUsers = await usersModel.findAll({
      attributes: { exclude: ["password", "role_id"] },
      include: [
        {
          model: rolesModel,
          attributes: ["role_name"],
        },
      ],
    });
    return getAllUsers;
  } catch (error) {
    throw error;
  }
};

export const getUserByIdService = async (id) => {
  try {
    const getUserById = await usersModel.findByPk(id, {
      attributes: {
        exclude: [
          "password",
          "role_id",
          "refresh_token",
          "last_login",
          "is_active",
          "createdAt",
          "updatedAt",
        ],
      },
      include: [
        {
          model: rolesModel,
          attributes: ["role_name"],
        },
      ],
    });
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
      attributes: {
        exclude: [
          "role_id",
          "refresh_token",
          "last_login",
          "is_active",
          "createdAt",
          "updatedAt",
        ],
      },
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
    console.log(!!validateUser);
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

export const saveRefreshTokenService = async (refreshToken, id) => {
  try {
    if (!refreshToken) {
      return await usersModel.update(
        { refresh_token: null },
        { where: { id } }
      );
    }

    const tokenHash = hashToken(refreshToken);
    return await usersModel.update(
      { refresh_token: tokenHash },
      { where: { id } }
    );
  } catch (error) {
    throw error;
  }
};

export const refreshTokenService = async (userId, refreshToken) => {
  const tokenHash = hashToken(refreshToken);

  const record = await usersModel.findOne({
    where: {
      id: userId,
      refresh_token: tokenHash,
    },
  });

  return !!record;
};
