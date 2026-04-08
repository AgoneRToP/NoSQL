import { User } from "../models/user.model.js";

class UserController {
  #_usersModel;

  constructor() {
    this.#_usersModel = User;
  }

  getAll = async (req, res) => {
    const users = await this.#_usersModel.find();

    res.send({
      success: true,
      data: users,
    });
  };

  uploadAvatar = async (req, res) => {
    const user = await this.#_usersModel.findById(req.user.id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    user.avatar_url = `/uploads/${req.file.filename}`;
    await user.save();

    res.send({
      success: true,
      data: user,
    });
  };
}

export default new UserController()
