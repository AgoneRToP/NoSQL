import { Book } from "../models/book.model.js";
import { Category } from "../models/category.model.js";

export const getAllBooks = async (req, res) => {
  const {
    search,
    minPrice,
    maxPrice,
    minRating,
    maxRating,
    page = 1,
    limit = 5,
    sortField = "-createdAt",
  } = req.query;
  const filter = {};

  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
      {
        author: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (minPrice) {
    filter.price = {
      $gte: minPrice,
    };
  }

  if (maxPrice) {
    filter.price = {
      $lte: maxPrice,
    };
  }

  if (minRating) {
    filter.rating = {
      $gte: minRating,
    };
  }

  if (maxRating) {
    filter.rating = {
      $lte: maxRating,
    };
  }

  const books = await Book.find(filter)
    .sort(sortField)
    .skip((page - 1) * limit)
    .limit(limit);

  const count = await Book.countDocuments(filter);

  res.send({
    success: true,
    limit,
    page,
    totalCount: count,
    data: books,
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
    category,
  } = req.body;

  const book = new Book({
    title,
    description,
    price,
    quantity,
    total_pages,
    author,
    rating,
    category,
  });

  await book.save();

  await Category.updateOne(
    { _id: category },
    {
      $push: {
        books: book._id,
      },
    },
  );

  res.status(201).send({
    success: true,
    data: book,
  });
};
