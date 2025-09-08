import Pizza from "../models/Pizza.js";

export const getPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pizzas" });
  }
};

export const addPizza = async (req, res) => {
  try {
    const pizza = new Pizza(req.body);
    const savedPizza = await pizza.save();
    res.status(201).json(savedPizza);
  } catch (error) {
    res.status(400).json({ message: "Error adding pizza" });
  }
};
