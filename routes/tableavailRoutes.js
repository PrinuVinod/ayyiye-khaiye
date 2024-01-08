// routes/tableavailRoutes.js
const express = require('express');
const router = express.Router();
const Table = require('../models/Table');

router.get('/tableavail', async (req, res) => {
    try {
        const tables = await Table.find({}, 'tableNumber isAvailable');
        res.render('tableavail', { tables });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;