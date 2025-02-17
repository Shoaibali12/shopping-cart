const express = require("express");
const multer = require("multer");
const path = require("path");
const Product = require("../model/product.js");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Configure Multer for Image Upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save images in "uploads/" folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// @route   POST /api/products/add
// @desc    Add a new product (Authenticated User)
// @access  Private
router.post(
  "/add",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, price, description, category } = req.body;
      const image = req.file ? req.file.filename : null;

      if (!title || !price || !description || !category || !image) {
        return res.status(400).json({ message: "All fields are required" });
      }

      if (!req.user || !req.user.userId) {
        return res
          .status(401)
          .json({ message: "Unauthorized: No userId found in token" });
      }

      console.log("✅ Creating Product for User ID:", req.user.userId); // Debugging

      const newProduct = new Product({
        title,
        price,
        description,
        category,
        image,
        userId: req.user.userId, // ✅ Ensure userId is added
      });

      await newProduct.save();
      res
        .status(201)
        .json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
      console.error("🚨 Server Error:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }
);

router.get("/my-products", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId; // ✅ Get user ID from the token
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user ID found" });
    }

    const products = await Product.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("🚨 Server Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
