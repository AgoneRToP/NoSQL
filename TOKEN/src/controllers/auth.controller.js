import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jwtConfig from "../configs/jwt.config.js";

class AuthController {
  #_userModel;
  constructor() {
    this.#_userModel = User;
  }

  login = async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await this.#_userModel.findOne({ username });

    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "User not found", с
      });
    }

    const isPassSame = await this.#_comparePass(
      password,
      existingUser.password,
    );

    if (!isPassSame) {
      return res.status(409).send({
        success: false,
        message: "Given password is invalid",
      });
    }

    // token generation
    const token = jwt.sign(
      { id: existingUser.id, username: existingUser.username },
      jwtConfig.SECRET_KEY,
      {
        algorithm: "HS256",
        expiresIn: jwtConfig.EXPIRE_TIME,
      },
    );

    res.send({
      success: true,
      data: {
        token: token,
      },
    });
  };

  register = async (req, res) => {
    const { name, age, username, password } = req.body;

    const existingUser = await this.#_userModel.findOne({ username });

    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "Username already taken",
      });
    }

    const hashedPass = await this.#_hashPassword(password);

    const newUser = await this.#_userModel.insertOne({
      name,
      username,
      password: hashedPass,
      age,
    });

    // token generation
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      jwtConfig.SECRET_KEY,
      {
        algorithm: "HS256",
        expiresIn: jwtConfig.EXPIRE_TIME,
      },
    );

    res.send({
      success: true,
      data: {
        token,
      },
    });
  };

  #_hashPassword = async (pass) => {
    const hashedPass = await bcrypt.hash(pass, 10);

    return hashedPass;
  };

  #_comparePass = async (originalPass, hashedPass) => {
    const isSame = await bcrypt.compare(originalPass, hashedPass);

    return isSame;
  };
}

export default new AuthController();
