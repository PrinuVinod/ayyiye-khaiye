// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/admin', (req, res) => {
  res.render('admin', { isAdminLoggedIn: false });
});

router.post('/admin/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name, password });
    console.log('User:', user);

    if (user) {
      res.render('admin', { isAdminLoggedIn: true });
    } else {
      res.redirect('/admin');
    }
  } catch (error) {
    console.error('Error checking login credentials:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
