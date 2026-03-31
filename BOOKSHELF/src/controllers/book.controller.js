import { Book } from "../models/book.model";

export const getAllBook = async (req, res) => {
  const book = await Book.find();

  res.send({
    success: true,
    data: book,
  });
};

export const createBook = async (req, res) => {
  const {
    title,
    description,
    price,
    quantity,
    total_pages,
    author,
    rating,
    category_id,
  } = req.body;

  const book = new Book({
    title,
    description,
    price,
    quantity,
    total_pages,
    author,
    rating,
    category_id,
  });

  await book.save();

  res.send({
    success: true,
    data: book,
  });
};
