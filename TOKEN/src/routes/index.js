import { Router } from "express";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import postRouter from "./post.router.js";

const apiRouter = Router();

apiRouter
  .use("/auth", authRouter)
  .use("/users", userRouter)
  .use("/posts", postRouter);

export default apiRouter;
