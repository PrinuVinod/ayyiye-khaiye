const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Define your toorder routes here
router.post('/submit-order', async (req, res) => {
  try {
    const { itemName, quantity } = req.body.order;

    // Assuming you have a MongoDB collection named 'orders'
    const order = new Order({ itemName, quantity });
    await order.save();

    res.json({ success: true, message: 'Order submitted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error submitting order.' });
  }
});

module.exports = router;
