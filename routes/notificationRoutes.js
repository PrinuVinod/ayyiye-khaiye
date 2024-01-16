// routes/notificationRoutes.js

const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.render('notifications', { notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
