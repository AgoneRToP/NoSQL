import { Router } from "express";
import productRouter from "./product.route.js";

const apiRouter = Router();

apiRouter.use("/products", productRouter);

export default apiRouter;
