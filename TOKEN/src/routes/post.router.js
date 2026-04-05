import express from 'express';
import { postController, toggleLike } from '../controllers/post.controller';

const postRouter = express.Router();

postRouter.post('/', postController);
postRouter.post('/like', toggleLike);

export default postRouter;