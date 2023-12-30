// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
  },
  tableNumber: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
