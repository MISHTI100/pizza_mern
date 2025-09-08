// backend/routes/orderRoutes.js
import express from "express";
import Order from "../models/orderModel.js";
import auth from "../middleware/auth.js";
import adminRoute from "../middleware/adminRoute.js";

const router = express.Router();

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const { orderItems, totalPrice, paymentMethod } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      totalPrice,
      paymentMethod,
      paymentStatus: "Pending",
      deliveryStatus: "Pending",
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create order", error });
  }
});

// @desc    Get logged-in user orders
// @route   GET /api/orders/myorders
// @access  Private
router.get("/myorders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
});

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Admin
router.get("/", auth, adminRoute, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email").sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch all orders", error });
  }
});

// @desc    Update order delivery/payment status (admin)
// @route   PUT /api/orders/:id
// @access  Admin
router.put("/:id", auth, adminRoute, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const { deliveryStatus, paymentStatus } = req.body;

    if (deliveryStatus) order.deliveryStatus = deliveryStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update order", error });
  }
});

export default router;
