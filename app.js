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
app.use(express.static('views/cum n eat'));
app.use(express.static('views/cum n eat/css'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

app.get('/', async (req, res) => {
  res.render('cum n eat/index.html');
});
app.use('/menu', menuRoutes);
app.use('/additem', additemRoutes);
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
