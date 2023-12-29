// models/KitchenView.js

const mongoose = require('mongoose');

const kitchenViewSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const KitchenView = mongoose.model('KitchenView', kitchenViewSchema);

module.exports = KitchenView;
