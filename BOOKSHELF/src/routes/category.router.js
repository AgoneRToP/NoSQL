import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter
  .get("/", getAllCategories)
  .post("/", createCategory)
  .put("/:id", updateCategory)
  .delete("/:id", deleteCategory);

export default categoryRouter;
