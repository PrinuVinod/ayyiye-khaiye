// routes/menuRoutes.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    let menu = await MenuItem.find(query);

    menu = menu.sort((a, b) => {
      if (a.category === b.category) {
        return a.name.localeCompare(b.name);
      }
      return a.category.localeCompare(b.category);
    });

    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      res.json({ menu });
    } else {
      const tableNumbers = [1, 2, 3, 4, 5];

      res.render('menu', { menu, selectedCategory: category, order: [], tableNumbers });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/get-orders', async (req, res) => {
  try {
    const orderList = await Order.find();
    
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      res.json({ orderList });
    } else {
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
    
    const menuItem = await MenuItem.findOne({ name: itemName });
    const price = menuItem ? menuItem.price : 0;

    const quantity = req.body.quantity;
    const tableNumber = parseInt(req.body.tableNumber, 10);

    const order = new Order({
      itemName,
      price,
      quantity,
      tableNumber,
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
