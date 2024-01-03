// routes/toorderRoutes.js

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const KitchenView = require('../models/KitchenView');
const MenuItem = require('../models/MenuItem');

router.get('/get-total-amount/:tableNumber', async (req, res) => {
  try {
    const { tableNumber } = req.params;

    const orders = await Order.find({ tableNumber });
    let totalAmount = 0;

    for (const order of orders) {
      const menuItem = await MenuItem.findOne({ name: order.itemName });
      if (menuItem) {
        totalAmount += menuItem.price * order.quantity;
      }
    }

    res.json({ totalAmount });
  } catch (error) {
    res.status(500).json({ error: 'Error calculating total amount' });
  }
});

router.post('/submit-order/:tableNumber', async (req, res) => {
  try {
    const { tableNumber } = req.params;

    console.log('Received tableNumber:', tableNumber); // Add this line

    // Fetch orders for the specific table
    const orders = await Order.find({ tableNumber });

    // Create KitchenView documents from orders and save to the KitchenView collection
    const kitchenViewDocs = orders.map(order => ({
      itemName: order.itemName,
      quantity: order.quantity,
      tableNumber: order.tableNumber, // Include the table number
    }));
    await KitchenView.create(kitchenViewDocs);

    // Delete orders from the Order collection
    await Order.deleteMany({ tableNumber });

    res.json({ success: true });
  } catch (error) {
    console.error('Error submitting order:', error);
    res.status(500).json({ error: 'Error submitting order' });
  }
});

router.delete('/delete-order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    await Order.findByIdAndDelete(orderId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting order' });
  }
});

module.exports = router;