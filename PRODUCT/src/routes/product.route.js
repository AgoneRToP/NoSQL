import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const productRouter = Router();

productRouter
  .post("/", createProduct)
  .get("/", getAllProducts)
  .put("/:id", updateProduct)
  .delete("/:id", deleteProduct);

export default productRouter;
