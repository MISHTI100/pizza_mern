// backend/routes/paymentRoutes.js
import express from "express";
import auth from "../middleware/auth.js";
import Order from "../models/orderModel.js";

const router = express.Router();

// @desc    Create a dummy payment order
// @route   POST /api/payments/create
// @access  Private
router.post("/create", auth, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    // Dummy order ID (replace with Razorpay or other gateway)
    const paymentOrder = {
      id: `ORDER_${Date.now()}`,
      amount,
      currency: "INR",
      status: "created",
    };

    res.status(201).json(paymentOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create payment order", error });
  }
});

// @desc    Verify payment and update order
// @route   POST /api/payments/verify/:orderId
// @access  Private
router.post("/verify/:orderId", auth, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentStatus } = req.body; // e.g., "Paid" or "Failed"

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.paymentStatus = paymentStatus || "Paid"; // Update payment status
    await order.save();

    res.json({ message: "Payment verified successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment verification failed", error });
  }
});

export default router;
