// routes/toorderRoutes.js

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const KitchenView = require('../models/KitchenView');

// Route to get orders as HTML
router.get('/get-orders', async (req, res) => {
  try {
    const orderList = await Order.find();
    // Render an HTML page with the orderList
    res.render('order-list', { orderList });
  } catch (error) {
    res.status(500).send('Error fetching order data');
  }
});

// Route to submit orders to the kitchen view
router.post('/submit-order', async (req, res) => {
    try {
        // Get orders from the Order collection
        const orders = await Order.find();

        // Duplicate orders to KitchenView
        await KitchenView.insertMany(orders);

        // Clear orders after duplication
        await Order.deleteMany();

        // Redirect to the review order page or send a success message
        res.send('Order submitted successfully!');
    } catch (error) {
        res.status(500).send('Error submitting order');
    }
});

// Route to delete a specific order
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