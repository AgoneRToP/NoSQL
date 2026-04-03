import { Router } from "express";
import categoryRouter from "./category.router.js";
import bookRouter from "./book.router.js";

const apiRouter = Router();

apiRouter.use("/categories", categoryRouter).use("/books", bookRouter);

export default apiRouter;
