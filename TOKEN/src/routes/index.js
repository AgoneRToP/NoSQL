import { Router } from "express";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import postRouter from "./post.router.js";
import commentRouter from "./comment.router.js";

const apiRouter = Router();

apiRouter
  .use("/auth", authRouter)
  .use("/users", userRouter)
  .use("/post", postRouter)
  .use("/comment", commentRouter);

export default apiRouter;
