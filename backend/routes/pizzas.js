const express = require('express');
const router = express.Router();
const Pizza = require('../models/Pizza');

// GET /api/pizzas — get all pizzas
router.get('/', async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;


