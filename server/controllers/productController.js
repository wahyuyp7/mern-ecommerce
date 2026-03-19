import Product from "../models/productModel.js"
import cloudinary from "../config/cloudinary.js"

/* ===============================
   GET ALL PRODUCTS (PUBLIC)
================================ */
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({})
    res.json(products)
  } catch (error) {
    next(error)
  }
}

/* ===============================
   CREATE PRODUCT (ADMIN)
================================ */
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      price,
      description,
      category,
      countInStock,
    } = req.body

    if (!req.file) {
      res.status(400)
      throw new Error("Image is required")
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64")
    const dataURI = `data:${req.file.mimetype};base64,${b64}`

    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder: "products",
    })

    const product = await Product.create({
      name,
      price,
      description,
      category,
      countInStock,
      image: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
    })

    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
}

/* ===============================
   UPDATE PRODUCT (ADMIN)
================================ */
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      res.status(404)
      throw new Error("Product not found")
    }

    const {
      name,
      price,
      description,
      category,
      countInStock,
    } = req.body

    product.name = name ?? product.name
    product.price = price ?? product.price
    product.description = description ?? product.description
    product.category = category ?? product.category
    product.countInStock = countInStock ?? product.countInStock

    // 🖼️ Replace image jika ada file baru
    if (req.file) {
      // Hapus image lama
      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId)
      }

      const b64 = Buffer.from(req.file.buffer).toString("base64")
      const dataURI = `data:${req.file.mimetype};base64,${b64}`

      const uploadResult = await cloudinary.uploader.upload(dataURI, {
        folder: "products",
      })

      product.image = uploadResult.secure_url
      product.imagePublicId = uploadResult.public_id
    }

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
}

/* ===============================
   DELETE PRODUCT (ADMIN)
================================ */
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      res.status(404)
      throw new Error("Product not found")
    }

    // Hapus image Cloudinary
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId)
    }

    await product.deleteOne()

    res.json({ message: "Product removed" })
  } catch (error) {
    next(error)
  }
}
