import express from "express"
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js"

import { protect, adminOnly } from "../middleware/authMiddleware.js"
import upload from "../middleware/uploadMiddleware.js"

const router = express.Router()

// Public
router.get("/", getProducts)
router.get("/:id", getProductById)

// Admin
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  createProduct
)

router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updateProduct
)

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProduct
)

export default router
