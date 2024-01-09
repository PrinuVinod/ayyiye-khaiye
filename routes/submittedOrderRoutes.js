// routes/submittedOrderRoutes.js
const express = require('express');
const router = express.Router();
const SubmittedOrder = require('../models/SubmittedOrder');

router.get('/', async (req, res) => {
  try {
    const { tableNumber } = req.query;

    const submittedOrders = await SubmittedOrder.find({ tableNumber });

    const aggregatedOrders = {};
    for (const order of submittedOrders) {
      const { itemName, quantity, totalAmount, price } = order;

      if (!aggregatedOrders[itemName]) {
        aggregatedOrders[itemName] = {
          price,
          totalQuantity: 0,
          totalAmount: 0,
        };
      }

      aggregatedOrders[itemName].totalQuantity += quantity;
      aggregatedOrders[itemName].totalAmount += totalAmount;
    }

    res.render('submittedOrders', { aggregatedOrders });
  } catch (error) {
    console.error('Error fetching submitted orders:', error);
    res.status(500).json({ error: 'Error fetching submitted orders' });
  }
});

module.exports = router;
