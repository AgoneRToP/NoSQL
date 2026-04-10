import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jwtConfig from "../configs/jwt.config.js";
import { NotFoundException } from "../exceptions/not-found.exception.js";
import { ConflictException } from "../exceptions/conflict.exception.js";
import { BadRequestException } from "../exceptions/bad-request.exception.js";
import { config } from "dotenv";

config();

const BASE_URL = process.env.BASE_URL;


class AuthController {
  #_userModel;
  constructor() {
    this.#_userModel = User;
  }

  login = async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const existingUser = await this.#_userModel.findOne({ username });

      if (!existingUser) {
        throw new NotFoundException("User not found");
      }

      const isPassSame = await this.#_comparePass(
        password,
        existingUser.password,
      );

      if (!isPassSame) {
        throw new ConflictException("Given password is invalid");
      }

      // token generation
      const token = this.#_generateAccessToken({
        id: existingUser.id,
        role: existingUser.role,
      });
      const refreshToken = this.#_generateRefreshToken({
        id: existingUser.id,
        role: existingUser.role,
      });

      res.send({
        success: true,
        data: {
          accessToken: token,
          refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  register = async (req, res) => {
    try {
      const { name, age, username, password, email } = req.body;

      const existingUser = await this.#_userModel.findOne({ username });

      if (existingUser) {
        throw new BadRequestException("Username already taken");
      }

      const allowedRoles = ["USER", "VIEWER"];
      const userRole = allowedRoles.includes(role) ? role : "USER";

      const hashedPass = await this.#_hashPassword(password);
      const newUser = await this.#_userModel.insertOne({
        name,
        age,
        username,
        email,
        password: hashedPass,
        role: userRole,
      });

      // token generation
      const token = this.#_generateAccessToken({
        id: newUser.id,
        role: newUser.role,
      });
      const refreshToken = this.#_generateRefreshToken({
        id: newUser.id,
        role: newUser.role,
      });

      res.send({
        success: true,
        data: {
          accessToken: token,
          refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  #_hashPassword = async (pass) => {
    const hashedPass = await bcrypt.hash(pass, 10);

    return hashedPass;
  };

  #_comparePass = async (originalPass, hashedPass) => {
    const isSame = await bcrypt.compare(originalPass, hashedPass);

    return isSame;
  };

  #_generateAccessToken = (payload) => {
    const token = jwt.sign(payload, jwtConfig.SECRET_KEY, {
      algorithm: "HS256",
      expiresIn: jwtConfig.EXPIRE_TIME,
    });

    return token;
  };

  #_generateRefreshToken = (payload) => {
    const token = jwt.sign(payload, jwtConfig.REFRESH_TOKEN_SECRET_KEY, {
      algorithm: "HS256",
      expiresIn: jwtConfig.REFRESH_TOKEN_EXPIRE_TIME,
    });

    return token;
  };

  refresh = async (req, res, next) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        throw new BadRequestException("Token not given");
      }

      const payload = jwt.verify(
        refreshToken,
        jwtConfig.REFRESH_TOKEN_SECRET_KEY,
      );

      const accessToken = this.#_generateAccessToken({
        id: payload.id,
        role: payload.role,
      });

      res.send({
        success: true,
        data: {
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  forgotPassword = async (req, res, next) => {
    try {
      const { email } = req.body;

      const existingUser = await this.#_userModel.findOne({ email });

      if (!existingUser) {
        throw new NotFoundException("User topilmadi!");
      }

      const signedUrl = signature.sign(
        `${BASE_URL}/auth/reset-password?userId=${existingUser._id}`,
        {
          ttl: 30,
        },
      );

      sendEmail(email, "Password reset", `Password reset link: ${signedUrl}`);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      const { userId } = req.query;
      const { password } = req.body;

      const hashedPass = await this.#_hashPassword(password);

      await this.#_userModel.updateOne(
        { _id: userId },
        { password: hashedPass },
      );

      res.status(204).send();
    } catch (error) {
      console.log(error, "ERROROR");
      next(error);
    }
  };

  seedAdmins = async () => {
    const admins = [
      {
        username: "admin",
        password: "123456",
      },
      {
        name: "Viewer User",
        username: "viewer",
        age: 20,
        password: "viewer123",
        role: "VIEWER"
      }
    ];

    for (let a of admins) {
      const existingUser = await this.#_userModel.findOne({
        username: a.username,
      });

      if (!existingUser) {
        await this.#_userModel.insertOne({
          ...a,
          role: "ADMIN",
          password: await this.#_hashPassword(a.password),
        });
      }
    }

    console.log("ADMINS SEEDED✅");
  };
}

export default new AuthController();
