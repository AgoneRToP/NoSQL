import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      minLength: [4, "Eng kamida 4 uzunlikka ega bo'lsin"],
      unique: [true, "Kategoriya nomi takrorlanishi mumkin emas"],
    },
    books: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Book",
      },
    ],
  },
  {
    collection: "categories",
    timestamps: true,
  },
);

export const Category = mongoose.model("Category", CategorySchema);
