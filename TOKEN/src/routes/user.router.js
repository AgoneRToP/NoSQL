import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { Protected } from "../middlewares/protected.middleware.js";

const userRouter = Router();

userRouter
  .get("/", Protected(true), userController.getAll)
  .post("/upload", )

export default userRouter;
