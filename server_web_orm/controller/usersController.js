import {
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
} from "../service/userService.js";

export const getAllUserController = async (req, res) => {
  try {
    const result = await getAllUsersService();
    return res.status(200).json({
      status: true,
      mess: "Get all users successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: "Server error" });
  }
};

export const getByIdUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getUserByIdService(id);
    if (!result) {
      return res.status(404).json({ status: false, mess: "Can not find user" });
    }
    return res.status(200).json({
      status: true,
      mess: "Get by id user successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: "Server error" });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteUserService(id);
    if (!result) {
      return res
        .status(404)
        .json({ status: false, mess: "Can not find and delete user" });
    }
    return res.status(200).json({
      status: true,
      mess: "Deleted user successfully!",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: "Server error" });
  }
};
