// routes/submittedOrderRoutes.js
const express = require('express');
const router = express.Router();
const SubmittedOrder = require('../models/SubmittedOrder');

router.get('/', async (req, res) => {
  try {
    const submittedOrders = await SubmittedOrder.find();

    // Calculate total quantity and amount for each item
    const aggregatedOrders = {};
    submittedOrders.forEach(order => {
      const { itemName, quantity, totalAmount } = order;
      if (!aggregatedOrders[itemName]) {
        aggregatedOrders[itemName] = {
          totalQuantity: 0,
          totalAmount: 0,
        };
      }
      aggregatedOrders[itemName].totalQuantity += quantity;
      aggregatedOrders[itemName].totalAmount += totalAmount;
    });

    res.render('submittedOrders', { aggregatedOrders });
  } catch (error) {
    console.error('Error fetching submitted orders:', error);
    res.status(500).json({ error: 'Error fetching submitted orders' });
  }
});

module.exports = router;
