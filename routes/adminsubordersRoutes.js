// routes/submittedOrderRoutes.js
const express = require('express');
const router = express.Router();
const SubmittedOrder = require('../models/SubmittedOrder');

router.get('/', async (req, res) => {
  try {
    const { tableNumber } = req.query;

    if (!tableNumber) {
      return res.status(400).json({ error: 'Table number is required in the query parameters.' });
    }

    const submittedOrders = await SubmittedOrder.find({ tableNumber });

    if (!submittedOrders || submittedOrders.length === 0) {
      return res.status(404).json({ error: 'No submitted orders found for the specified table number.' });
    }

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

    res.render('adminsuborders', { aggregatedOrders });
  } catch (error) {
    console.error('Error fetching submitted orders:', error);
    res.status(500).json({ error: 'Internal server error. Please check the server logs for more details.' });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const { tableNumber } = req.query;

    if (!tableNumber) {
      return res.status(400).json({ error: 'Table number is required.' });
    }

    await SubmittedOrder.deleteMany({ tableNumber });

    res.json({ message: `Submitted orders for table ${tableNumber} deleted successfully.` });
  } catch (error) {
    console.error('Error deleting submitted orders:', error);
    res.status(500).json({ error: 'Error deleting submitted orders' });
  }
});

module.exports = router;
