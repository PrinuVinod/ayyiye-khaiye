// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const menuRoutes = require('./routes/menuRoutes');
const additemRoutes = require('./routes/additemRoutes');
const toorderRoutes = require('./routes/toorderRoutes');
const kitchenRoutes = require('./routes/kitchenRoutes');
const adminRoutes = require('./routes/adminRoutes');
const middleware = require('./middleware/middleware'); // Import the middleware
const MenuItem = require('./models/MenuItem');
const User = require('./models/User');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_CONNECT_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

app.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.render('homepage', { menu: menuItems });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/additem', middleware.redirectToAdminIfNotAuthenticated, additemRoutes);
app.use('/menu', menuRoutes);
// app.use('/additem', additemRoutes);
app.use('/toorder', toorderRoutes);
app.use('/', kitchenRoutes);
app.use('/', adminRoutes);

app.get('/disclaimer', (req, res) => {
  res.render('disclaimer');
});

app.get('/navigation', (req, res) => {
  res.render('navigation');
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/`);
});
