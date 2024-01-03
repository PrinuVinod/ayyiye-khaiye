// models/SubmittedOrder.js
const mongoose = require('mongoose');

const submittedOrderSchema = new mongoose.Schema({
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
    required: true,
  },
  tableNumber: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});

const SubmittedOrder = mongoose.model('SubmittedOrder', submittedOrderSchema);

module.exports = SubmittedOrder;
