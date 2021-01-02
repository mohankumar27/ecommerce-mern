const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Delete single product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.remove();
    res.json({ message: "Product Deleted Successfully" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Create single product
// @route POST /api/products/:id
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc Update single product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const {
    name,
    description,
    brand,
    category,
    image,
    countInStock,
    price,
  } = req.body;
  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.image = image || product.image;
    product.countInStock = countInStock || product.countInStock;
    product.description = description || product.description;
    const updatedproduct = await product.save();
    res.json(updatedproduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Create new Review
// @route PUT /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { rating, comment } = req.body;

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already Reviewed");
    }
    const reviewObj = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(reviewObj);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, currItem) => currItem.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201);
    res.json({ message: "review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Get Top rated products
// @route GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

module.exports = {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProductById,
  createProductReview,
  getTopProducts,
};
