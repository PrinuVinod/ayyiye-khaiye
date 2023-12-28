// routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const menu = await MenuItem.find(query);

    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      res.json({ menu });
    } else {
      res.render('menu', { menu, selectedCategory: category, order: [] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/menu/add-to-order', async (req, res) => {
  try {
    const { itemName, quantity } = req.body;

    console.log('Data received on the server:', { itemName, quantity });

    // Validate input
    if (!itemName || !quantity || quantity < 1) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Find the selected menu item
    const menuItem = await MenuItem.findOne({ name: itemName });

    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    // Create a new order
    const order = new Order({
      itemName: menuItem.name,
      quantity: quantity,
      // Copy other relevant properties from menuItem to order if needed
      // Example: price: menuItem.price,
    });

    // Save the order to the 'orders' collection
    await order.save();

    res.status(201).json({ message: 'Item added to order', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/get-orders', async (req, res) => {
  try {
    const orderList = await Order.find();

    // Check if it's an AJAX request
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      res.json({ orderList });
    } else {
      // If not an AJAX request, render the HTML template
      res.render('revieworder', { orderList });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/delete-order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find and delete the order with the specified ID
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully', deletedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
