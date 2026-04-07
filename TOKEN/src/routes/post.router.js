import { Router } from "express";
import { createPosts, toggleLike } from "../controllers/post.controller.js";
import { upload } from "../configs/multer.config.js";

const postRouter = Router();

postRouter
  .post("/", createPosts.getPostFull)
  .post("/like", toggleLike)
  .post(
    "/",
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "video", maxCount: 1 },
    ]),
    postController.create,
  );

export default postRouter;
