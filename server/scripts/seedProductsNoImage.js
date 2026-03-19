import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "../models/productModel.js";

dotenv.config();

const seedProducts = [
  {
    name: "Kaos Basic Premium",
    price: 129000,
    description: "Kaos katun nyaman dipakai sehari-hari.",
    category: "Fashion",
    countInStock: 25,
  },
  {
    name: "Headphone Wireless Lite",
    price: 349000,
    description: "Headphone bluetooth dengan suara jernih dan baterai tahan lama.",
    category: "Elektronik",
    countInStock: 18,
  },
  {
    name: "Blender Mini 2 in 1",
    price: 279000,
    description: "Blender praktis untuk dapur rumahan.",
    category: "Rumah Tangga",
    countInStock: 12,
  },
  {
    name: "Power Bank 10000mAh",
    price: 189000,
    description: "Power bank compact dengan fast charging.",
    category: "Gadget",
    countInStock: 30,
  },
  {
    name: "Sepatu Sneakers Casual",
    price: 425000,
    description: "Sneakers ringan untuk aktivitas harian.",
    category: "Fashion",
    countInStock: 20,
  },
];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingNames = await Product.find(
      { name: { $in: seedProducts.map((p) => p.name) } },
      { name: 1 }
    );

    const existingSet = new Set(existingNames.map((p) => p.name));
    const toInsert = seedProducts.filter((p) => !existingSet.has(p.name));

    if (toInsert.length === 0) {
      console.log("No new products inserted (all already exist).");
      return;
    }

    const inserted = await Product.insertMany(toInsert);
    console.log(`Inserted ${inserted.length} products without image upload.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();
