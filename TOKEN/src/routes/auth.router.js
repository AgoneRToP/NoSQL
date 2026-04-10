import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { ValidationMiddleware } from "../middlewares/validation.middleware.js";
import { LoginSchema } from "../schemas/auth/login.schema.js";
import { RegisterSchema } from "../schemas/auth/register.schema.js";

const authRouter = Router();

authRouter
  .post(
    "/signin",
    ValidationMiddleware(LoginSchema),
    authController.login
  )
  .post(
    "/signup",
    ValidationMiddleware(RegisterSchema),
    authController.register,
  )
  .post(
    "/refresh",
    authController.refresh
  );

export default authRouter;
