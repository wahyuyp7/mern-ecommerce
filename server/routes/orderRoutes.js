import express from "express";
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from "../controllers/orderController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addOrderItems);
router.get("/myorders", protect, getMyOrders);
router.get("/", protect, adminOnly, getOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/deliver", protect, adminOnly, updateOrderToDelivered);

export default router;
