import jwt from "jsonwebtoken";
import jwtConfig from "../configs/jwt.config.js";

export const Protected = (isProtected = true) => {
  return (req, res, next) => {
    if (!isProtected) return next();

    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(400).send({
        success: false,
        message: "Token not given",
      });
    }

    const token = authorization?.split(" ")[1];

    try {
      const payload = jwt.verify(token, jwtConfig.SECRET_KEY);

      req.user = payload;

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).send({
          success: false,
          message: "Token already expired",
        });
      }

      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(400).send({
          success: false,
          message: "JWT token is invalid",
        });
      }

      res.status(500).send({
        success: false,
        message: "Internal server error",
      });
    }
  };
};
