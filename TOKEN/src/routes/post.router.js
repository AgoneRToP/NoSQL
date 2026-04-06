import { Router } from 'express';
import { createPosts, toggleLike } from '../controllers/post.controller.js';

const postRouter = Router();

postRouter.post('/', createPosts.getPostFull);
postRouter.post('/like', toggleLike);

export default postRouter;