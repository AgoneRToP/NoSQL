import { Category } from "../models/category.model.js";

export const getAllCategories = async (req, res) => {
  const categories = await Category.find();

  res.send({
    success: true,
    data: categories,
  });
};

export const createCategory = async (req, res) => {
  const { name } = req.body;

  const category = new Category({
    name,
  });

  await category.save();

  res.send({
    success: true,
    data: category,
  });
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const foundedCategory = await Category.findById(id);

  if (!foundedCategory) {
    return res.status(404).json({
      success: false,
      message: "Category topilmadi",
    });
  }

  await Category.updateOne({ _id: id }, { name });

  res.status(204).send();
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const foundedCategory = await Category.findById(id);

  if (!foundedCategory) {
    return res.status(404).json({
      success: false,
      message: "Category topilmadi",
    });
  }

  await Category.deleteOne({ _id: id });

  res.status(204).send();
};
