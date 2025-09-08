const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
  prices: {
    small: Number,
    medium: Number,
    large: Number
  },
  category: { type: String, required: true },
});

module.exports = mongoose.model('Pizza', pizzaSchema);
