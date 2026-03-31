import { Router } from "express";
import categoryRouter from "./category.router.js";

const apiRouter = Router();

apiRouter.use("/categories", categoryRouter);

export default apiRouter;