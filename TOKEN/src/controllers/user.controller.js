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

  upload
}

export default new UserController()
