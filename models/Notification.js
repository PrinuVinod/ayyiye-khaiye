// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
