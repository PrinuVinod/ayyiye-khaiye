// routes/tableRoutes.js
const express = require('express');
const router = express.Router();
const Table = require('../models/Table');

router.get('/tables', async (req, res) => {
    try {
        const tables = await Table.find();
        res.render('tables', { tables });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/tables/:id', async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);

        if (table) {
            table.isAvailable = !table.isAvailable;
            await table.save();
            res.json({ success: true, table });
        } else {
            res.status(404).json({ success: false, message: 'Table not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// New route for updating payment status
router.put('/tables/:id/payment', async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);

        if (table) {
            // Assuming 'paymentStatus' is a boolean field
            table.paymentStatus = !table.paymentStatus;
            await table.save();
            res.json({ success: true, table });
        } else {
            res.status(404).json({ success: false, message: 'Table not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
