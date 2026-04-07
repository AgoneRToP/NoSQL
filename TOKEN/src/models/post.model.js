import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    video_url: { type: mongoose.SchemaTypes.String },
    image_url: { type: mongoose.SchemaTypes.String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    createdAt: { type: Date, default: Date.now },
  },
  {
    collation: "posts",
    versionKey: false,
    timestamps: true,
  },
);

export const Post = mongoose.model("Post", PostSchema);
