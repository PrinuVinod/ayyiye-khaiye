// routes/additemRoutes.js
const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

router.get('/', (req, res) => {
  res.render('additem');
});

router.post('/', async (req, res) => {
  try {
    showNotification('Loading...', 'loading');

    const { name, price, category } = req.body;

    const newItem = new MenuItem({
      name,
      price,
      category,
    });

    await newItem.save();

    console.log('Item added successfully!');
    showNotification('Item Added Successfully.', 'success');
    res.redirect('/additem');
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
