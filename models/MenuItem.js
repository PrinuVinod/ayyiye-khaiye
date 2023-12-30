// models/MenuItem.js
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, min: 0, required: true },
    category: { type: String, required: true },
    tableNumber: { type: Number, required: true },
}, { timestamps: true });

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
