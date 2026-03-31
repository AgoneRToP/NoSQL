import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: mongoose.SchemaTypes.String,
      minLength: [6, "Kitob nomi 6ta belgidan kam bo'lmasligi kerak"],
    },
    description: {
      type: mongoose.SchemaTypes.String,
      minLength: [10, "Kitob ma'lumoti 10ta belgidan kam bo'lmasligi kerak"],
    },
    author: {
      type: mongoose.SchemaTypes.String,
      minLength: [4, "Kitob muallifi ismi 4ta belgidan kam bo'lmasligi kerak"],
    },
    price: {
      type: mongoose.SchemaTypes.Number,
      min: 10000, // [10000, "Kamida 10000 bo'lishi kerak"]
      max: 200000,
      default: 10000,
    },
    total_pages: {
      type: mongoose.SchemaTypes.Number,
      min: 10,
      max: 1000,
    },
    quantity: {
      type: mongoose.SchemaTypes.Number,
      min: 1, 
      max: 500,
      default: 1,
    },
    rating: {
        type: mongoose.SchemaTypes.Number,
        min: 0,
        max: [5, "Rating 5 dan oshmasligi kerak"],
        default: 1
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Category"
    }
  },
  {
    versionKey: false,
    collection: "books",
    timestamps: true,
  },
);


export const Book = mongoose.model("Book", BookSchema)