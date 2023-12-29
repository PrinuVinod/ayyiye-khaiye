// models/order.js
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
  // Add other fields as needed
  // Example: user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
