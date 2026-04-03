import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: true,
      min: [3, "Ism kamida 3ta belgidan iborat bo'lishi kerak"],
    },
    age: {
      type: mongoose.SchemaTypes.Int32,
      min: [16, "Yosh kamida 16 bo'lishi kerak"],
      required: true,
    },
    username: {
      type: mongoose.SchemaTypes.String,
      required: true,
      min: [5, "Username kamida 5ta belgidan iborat bo'lishi kerak"],
      unique: true,
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
  },
  {
    collection: "users",
    versionKey: false,
    timestamps: true,
  },
);

export const User = mongoose.model("User", UserSchema)