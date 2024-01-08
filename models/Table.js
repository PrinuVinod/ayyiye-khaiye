// models/Table.js
const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;