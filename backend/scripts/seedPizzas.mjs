// backend/seedPizzas.mjs
import mongoose from "mongoose";
import dotenv from "dotenv";
import Pizza from "./models/pizzaModel.js";

dotenv.config();

// Replace with your MongoDB URI in .env
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/pizzaApp";

const pizzas = [
  {
    name: "Margherita",
    image: "https://i.ibb.co/3s9xL3q/margherita.jpg",
    description: "Classic delight with 100% real mozzarella cheese",
    category: "Vegetarian",
    prices: [150, 250, 350],
  },
  {
    name: "Pepperoni",
    image: "https://i.ibb.co/2k3RZgS/pepperoni.jpg",
    description: "A classic pepperoni pizza loaded with extra cheese",
    category: "Non-Vegetarian",
    prices: [200, 300, 400],
  },
  {
    name: "Veggie Supreme",
    image: "https://i.ibb.co/8b7t6VZ/veggie.jpg",
    description: "Topped with onions, capsicum, olives, and mushrooms",
    category: "Vegetarian",
    prices: [180, 280, 380],
  },
  {
    name: "BBQ Chicken",
    image: "https://i.ibb.co/xs5MZ2h/bbq-chicken.jpg",
    description: "Smoky BBQ chicken with cheese and onion toppings",
    category: "Non-Vegetarian",
    prices: [220, 320, 420],
  },
];

const seedPizzas = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    // Clear existing pizzas
    await Pizza.deleteMany();
    console.log("Old pizzas removed");

    // Insert seed pizzas
    await Pizza.insertMany(pizzas);
    console.log("Pizzas seeded successfully");

    mongoose.disconnect();
    console.log("MongoDB disconnected");
    process.exit();
  } catch (error) {
    console.error("Error seeding pizzas:", error);
    process.exit(1);
  }
};

seedPizzas();
