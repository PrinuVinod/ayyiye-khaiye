// routes/menuRoutes.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');

// Set up multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    let menu = await MenuItem.find(query);
    
    // Sort the menu items by category and name
    menu = menu.sort((a, b) => {
      if (a.category === b.category) {
        return a.name.localeCompare(b.name);
      }
      return a.category.localeCompare(b.category);
    });

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

router.post('/add-to-order', upload.none(), async (req, res) => {
  try {
    const itemName = req.body.itemName;
    const quantity = req.body.quantity;

    // Validate data if needed

    // Save the order in the database
    const order = new Order({
      itemName,
      quantity,
    });
    await order.save();

    res.json({ success: true, message: 'Item added to order' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
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
