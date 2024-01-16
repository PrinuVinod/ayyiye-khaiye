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
const tableRoutes = require('./routes/tableRoutes');
const tableavailRoutes = require('./routes/tableavailRoutes');
const submittedOrdercheckRoutes = require('./routes/submittedOrdercheckRoutes');
const submittedOrderRoutes = require('./routes/submittedOrderRoutes');
const adminsuborderscheck = require('./routes/adminsuborderscheckRoutes');
const adminsuborders = require('./routes/adminsubordersRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const middleware = require('./middleware/middleware');
const MenuItem = require('./models/MenuItem');
const User = require('./models/User');
const path = require('path');

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
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

app.get('/', async (req, res) => {
  res.render('index');
});

app.use('/menu', menuRoutes);
app.use('/additem', additemRoutes);
app.use('/toorder', toorderRoutes);
app.use('/', kitchenRoutes);
app.use('/', adminRoutes);
app.use('/', tableRoutes);
app.use('/', tableavailRoutes);
app.use('/submitted-orders-check', submittedOrdercheckRoutes);
app.use('/submitted-orders', submittedOrderRoutes);
app.use('/adminsuborderscheck', adminsuborderscheck);
app.use('/adminsuborders', adminsuborders);
app.use('/notifications', notificationRoutes);

app.get('/disclaimer', (req, res) => {
  res.render('disclaimer');
});

app.get('/navigation', (req, res) => {
  res.render('navigation');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/`);
});