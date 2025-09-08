// backend/models/pizzaModel.js
import mongoose from "mongoose";

const pizzaSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    prices: {
      type: [Number], // Example: [SmallPrice, MediumPrice, LargePrice]
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Pizza = mongoose.model("Pizza", pizzaSchema);

export default Pizza;
