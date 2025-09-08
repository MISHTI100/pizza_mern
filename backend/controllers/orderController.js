import Order from "../models/Order.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("pizzas.pizza");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

export const addOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: "Error adding order" });
  }
};
