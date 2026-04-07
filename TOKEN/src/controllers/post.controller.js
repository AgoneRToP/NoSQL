import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";

export const createPosts = {
  createPost: async (req, res, next) => {
    try {
      const { title, content, authorId } = req.body;

      const newPost = await Post.create({
        title,
        content,
        author: authorId,
        image_url: `/upload/${req.filter.image[0].filename}`,
        video_url: req.files?.video?.[0]?.filename
          ? `/uploads/${req.files?.video?.[0]?.filename}`
          : null,
      });
      res.send({
        success: true,
        data: newPost,
      });
    } catch (error) {
      next(error);
    }
  },

  getPostFull: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate(
        "author",
        "name",
      );
      const comments = await Comment.find({ postId: req.params.id }).populate(
        "author",
        "name",
      );

      res.json({
        ...post._doc,
        comments,
        likesCount: post.likes.length,
      });
    } catch (err) {
      res.status(404).json({ error: "Пост не найден" });
    }
  },
};

export const toggleLike = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ error: "Пост не найден" });

    const isLiked = post.likes.includes(userId);
    const update = isLiked
      ? { $pull: { likes: userId } }
      : { $addToSet: { likes: userId } };

    await Post.findByIdAndUpdate(postId, update);
    res.json({ liked: !isLiked });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
