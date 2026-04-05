import express from 'express';
import { commentController } from '../controllers/comment.controller';

const commentRouter = express.Router();

commentRouter.get('/:id', commentController);

export default commentRouter;