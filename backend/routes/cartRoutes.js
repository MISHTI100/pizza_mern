// backend/routes/CartRoutes.js
const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart"); // your Cart model
const { verifyToken } = require("../middleware/auth"); // optional auth middleware

// Add item to cart
router.post("/add", verifyToken, async (req, res) => {
  try {
    const { userId, pizzaId, quantity } = req.body;
    const newCartItem = new Cart({ userId, pizzaId, quantity });
    const savedItem = await newCartItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get cart items for a user
router.get("/:userId", verifyToken, async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.params.userId });
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update cart item quantity
router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const updatedItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete cart item
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Cart item deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
