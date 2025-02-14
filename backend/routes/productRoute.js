const express = require("express");
const multer = require("multer");
const path = require("path");
const Product = require("../model/product.js");

const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Images will be saved in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// @route   POST /api/products/add
// @desc    Add a new product with image upload
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { title, price, description, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Image path

    if (!title || !price || !description || !category || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({
      title,
      price,
      description,
      category,
      image,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
