// backend/routes/pizzaRoutes.js
import express from "express";
import Pizza from "../models/pizzaModel.js";
import adminRoute from "../middleware/adminRoute.js";

const router = express.Router();

// @desc    Get all pizzas
// @route   GET /api/pizzas
// @access  Public
router.get("/", async (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pizzas", error });
  }
});

// @desc    Get single pizza by ID
// @route   GET /api/pizzas/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) return res.status(404).json({ message: "Pizza not found" });
    res.json(pizza);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pizza", error });
  }
});

// @desc    Create new pizza
// @route   POST /api/pizzas
// @access  Admin
router.post("/", adminRoute, async (req, res) => {
  try {
    const { name, description, image, category, prices } = req.body;
    const pizza = new Pizza({ name, description, image, category, prices });
    const createdPizza = await pizza.save();
    res.status(201).json(createdPizza);
  } catch (error) {
    res.status(500).json({ message: "Failed to create pizza", error });
  }
});

// @desc    Update pizza
// @route   PUT /api/pizzas/:id
// @access  Admin
router.put("/:id", adminRoute, async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) return res.status(404).json({ message: "Pizza not found" });

    const { name, description, image, category, prices } = req.body;
    pizza.name = name || pizza.name;
    pizza.description = description || pizza.description;
    pizza.image = image || pizza.image;
    pizza.category = category || pizza.category;
    pizza.prices = prices || pizza.prices;

    const updatedPizza = await pizza.save();
    res.json(updatedPizza);
  } catch (error) {
    res.status(500).json({ message: "Failed to update pizza", error });
  }
});

// @desc    Delete pizza
// @route   DELETE /api/pizzas/:id
// @access  Admin
router.delete("/:id", adminRoute, async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) return res.status(404).json({ message: "Pizza not found" });

    await pizza.remove();
    res.json({ message: "Pizza removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete pizza", error });
  }
});

export default router;
