import { Router } from 'express';
import { commentController } from '../controllers/comment.controller.js';

const commentRouter = Router();

commentRouter.get('/:id', commentController.deleteComment);

export default commentRouter;