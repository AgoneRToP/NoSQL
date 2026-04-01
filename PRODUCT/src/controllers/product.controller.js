import { Product } from "../models/produck.model.js";

// CREATE
export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

// READ (Filtering, Sorting, Pagination, Searching)
export const getAllProducts = async (req, res) => {
  try {
    let { page = 1, limit = 10, sort, search, ...filters } = req.query;

    // 1. Searching
    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // 2. Filtering
    query = { ...query, ...filters };

    // 3. Sorting
    let sortBy = sort ? sort.split(",").join(" ") : "-createdAt";

    // 4. Pagination
    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .sort(sortBy)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: products,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity, rating, manufacture_year } =
    req.body;

  const foundedProduct = await Product.findById(id);

  if (!foundedProduct) {
    return res.status(404).json({
      success: false,
      message: "product topilmadi",
    });
  }

  await Product.updateOne({ _id: id }, { name, description, price, quantity, rating, manufacture_year });

  res.json(Product);
};

// DELETE
export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Mahsulot o'chirildi" });
};
