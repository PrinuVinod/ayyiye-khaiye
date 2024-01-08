// routes/kitchenRoutes.js
const express = require('express');
const router = express.Router();
const KitchenView = require('../models/KitchenView');

router.get('/kitchenview', async (req, res) => {
    try {
        const kitchenData = await KitchenView.find().sort({ tableNumber: 1 });
        res.render('kitchenview', { kitchenData });
    } catch (error) {
        console.error('Error fetching kitchen data:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/deleteItem', async (req, res) => {
  try {
    const itemId = req.body.itemId;

    await KitchenView.findByIdAndDelete(itemId);

    res.redirect('/kitchenview');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
