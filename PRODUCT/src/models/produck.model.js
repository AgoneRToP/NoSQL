import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    manufacture_year: { type: Number, required: true },
  },
  { timestamps: true },
);

productSchema.index({ name: "text", description: "text" });

export const Product = mongoose.model("Product", productSchema);
