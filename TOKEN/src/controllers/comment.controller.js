import { Comment } from "../models/comment.model.js";

export const commentController = {
  addComment: async (req, res) => {
    try {
      const { text, authorId, postId } = req.body;
      const comment = await Comment.create({ text, author: authorId, postId });
      res.status(201).json(comment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteComment: async (req, res) => {
    try {
      await Comment.findByIdAndDelete(req.params.id);
      res.json({ message: "Комментарий удален" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
