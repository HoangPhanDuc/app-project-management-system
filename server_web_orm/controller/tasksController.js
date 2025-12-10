export const createProjectsController = async (req, res) => {
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
