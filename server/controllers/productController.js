import Product from "../models/Product.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../middleware/validateMiddleware.js";

// CREATE
export const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, countInStock } = req.body;

  if (!name || price === undefined) {
    throw new ApiError(400, "Name dan price wajib diisi");
  }

  if (price < 0 || countInStock < 0) {
    throw new ApiError(400, "Price dan stock tidak boleh negatif");
  }

  const product = await Product.create({
    name,
    price,
    description,
    countInStock,
  });

  res.status(201).json(product);
});

// READ ALL
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// READ BY ID
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, "Product tidak ditemukan");
  }

  res.json(product);
});

// UPDATE
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new ApiError(404, "Product tidak ditemukan");
  }

  const { name, price, description, countInStock } = req.body;

  if (price !== undefined && price < 0) {
    throw new ApiError(400, "Price tidak valid");
  }

  product.name = name ?? product.name;
  product.price = price ?? product.price;
  product.description = description ?? product.description;
  product.countInStock = countInStock ?? product.countInStock;

  const updated = await product.save();
  res.json(updated);
});

// DELETE
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new ApiError(404, "Product tidak ditemukan");
  }

  await product.deleteOne();
  res.json({ message: "Product berhasil dihapus" });
});
