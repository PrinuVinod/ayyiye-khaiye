// routes/additemRoutes.js
const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem'); // Assuming you have a MenuItem model

// Render the form to add a new item
router.get('/', (req, res) => {
  res.render('additem');
});

// Handle the form submission to add a new item
router.post('/', async (req, res) => {
  try {
    const { name, price, category } = req.body;

    // Validate input (add additional validation if needed)

    // Create a new MenuItem document
    const newItem = new MenuItem({
      name,
      price,
      category,
    });

    // Save the new item to the database
    await newItem.save();

    console.log('Item added successfully!');
    res.redirect('/additem');
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
