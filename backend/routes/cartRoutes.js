const express = require("express");
const Cart = require("../model/cart");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * 🛒 GET User Cart - Only fetch logged-in user's cart
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(200).json({ items: [] }); // Return empty cart if not found
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("🚨 Error fetching cart:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/**
 * ➕ ADD Item to Cart
 */
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { productId, title, price, image } = req.body;
    const userId = req.user.userId;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity if item already in cart
    } else {
      cart.items.push({ productId, title, price, image, quantity: 1 });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("🚨 Error adding item:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/**
 * ➖ REMOVE Item from Cart
 */
router.delete("/remove/:productId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = req.params.productId;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("🚨 Error removing item:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/**
 * ❌ CLEAR Cart (Optional)
 */
router.delete("/clear", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    await Cart.findOneAndDelete({ userId });

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("🚨 Error clearing cart:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
