import { Router } from "express";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";

const apiRouter = Router();

apiRouter.use("/auth", authRouter).use("/users", userRouter);

export default apiRouter;
