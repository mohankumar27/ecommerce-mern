const express = require("express");

const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
  updateOrderToDelivered,
} = require("../controllers/orderController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, isAdmin, getAllOrders);

router.post("/", protect, addOrderItems);

router.get("/myorders", protect, getMyOrders);

router.get("/:id", protect, getOrderById);

router.put("/:id/pay", protect, updateOrderToPaid);

router.put("/:id/deliver", protect, isAdmin, updateOrderToDelivered);

module.exports = router;
