const express = require("express");

const {
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  createProduct,
  createProductReview,
  getTopProducts,
} = require("../controllers/productController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, isAdmin, createProduct);
router.get("/top", getTopProducts);

router.get("/:id", getProductById);
router.post("/:id/reviews", protect, createProductReview);
router.put("/:id", protect, isAdmin, updateProductById);
router.delete("/:id", protect, isAdmin, deleteProductById);

module.exports = router;
