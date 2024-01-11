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

    await SubmittedOrder.create(submittedOrderArray);

    const kitchenViewDocs = orders.map(order => ({
      itemName: order.itemName,
      quantity: order.quantity,
      tableNumber: order.tableNumber,
    }));
    await KitchenView.create(kitchenViewDocs);

    await Order.deleteMany({ tableNumber });

    res.json({ success: true });
  } catch (error) {
    console.error('Error submitting order:', error);
    res.status(500).json({ error: 'Error submitting order' });
  }
});

// router.delete('/delete-order/:orderId', async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     await Order.findByIdAndDelete(orderId);
//     res.json({ success: true });
//   } catch (error) {
//     res.status(500).json({ error: 'Error deleting order' });
//   }
// });

router.delete('/menu/delete-order/:orderId', async (req, res) => {
    const orderId = req.params.orderId;

    try {
        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;