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
      const menuItem = await MenuItem.findOne({ itemName: order.itemName });
      if (menuItem) {
        totalAmount += menuItem.price * order.quantity;
      }
    }

    res.json({ totalAmount });
  } catch (error) {
    res.status(500).json({ error: 'Error calculating total amount' });
  }
});

router.get('/get-orders', async (req, res) => {
  try {
    const orderList = await Order.find();
    res.render('order-list', { orderList });
  } catch (error) {
    res.status(500).send('Error fetching order data');
  }
});

router.post('/submit-order', async (req, res) => {
    try {
        const orders = await Order.find();

        await KitchenView.insertMany(orders);

        await Order.deleteMany();

        res.send('Order submitted successfully!');
    } catch (error) {
        res.status(500).send('Error submitting order');
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