// routes/kitchenRoutes.js
const express = require('express');
const router = express.Router();
const KitchenView = require('../models/KitchenView');
const Notification = require('../models/Notification');

router.get('/kitchenview', async (req, res) => {
    try {
        const kitchenData = await KitchenView.find().sort({ tableNumber: 1 });
        const notifications = await Notification.find();
        res.render('kitchenview', { kitchenData, notifications });
    } catch (error) {
        console.error('Error fetching kitchen data:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/deleteItem', async (req, res) => {
  try {
    const itemId = req.body.itemId;

    await KitchenView.findByIdAndDelete(itemId);

    res.redirect('/kitchenview');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/notifications/:id/status', async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if (notification) {
            notification.status = !notification.status;
            await notification.save();
            res.json({ success: true, status: notification.status });
        } else {
            res.status(404).json({ success: false, message: 'Notification not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
