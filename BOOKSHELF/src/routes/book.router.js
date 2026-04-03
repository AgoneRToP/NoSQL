import { Router } from "express";
import { createBook, getAllBooks } from "../controllers/book.controller.js";
import { ValidateBodyMiddleware } from "../middleware/validate-body.middleware.js";
import { CreateBookSchema } from "../schemas/book/create-book.schema.js";

const bookRouter = Router();

bookRouter
  .get("/", getAllBooks)
  .post("/", ValidateBodyMiddleware(CreateBookSchema), createBook);

export default bookRouter;
