// routes/toorderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const KitchenView = require('../models/KitchenView');
const MenuItem = require('../models/MenuItem');
const SubmittedOrder = require('../models/SubmittedOrder');

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

    console.log('Received tableNumber:', tableNumber);
    const orders = await Order.find({ tableNumber });

    const submittedOrderArray = [];

    for (const order of orders) {
      const menuItem = await MenuItem.findOne({ name: order.itemName });
      if (menuItem) {
        const submittedOrderItem = {
          itemName: order.itemName,
          quantity: order.quantity,
          price: menuItem.price,
          tableNumber: order.tableNumber,
          totalAmount: menuItem.price * order.quantity,
        };
        submittedOrderArray.push(submittedOrderItem);
      }
    }

    // Add the submitted orders to the SubmittedOrder collection
    await SubmittedOrder.create(submittedOrderArray);

    // Add the orders to the KitchenView collection
    const kitchenViewDocs = orders.map(order => ({
      itemName: order.itemName,
      quantity: order.quantity,
      tableNumber: order.tableNumber,
    }));
    await KitchenView.create(kitchenViewDocs);

    // Delete the orders from the Order collection
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