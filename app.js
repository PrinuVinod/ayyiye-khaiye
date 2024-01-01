const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const menuRoutes = require('./routes/menuRoutes');
const additemRoutes = require('./routes/additemRoutes');
const toorderRoutes = require('./routes/toorderRoutes');
const MenuItem = require('./models/MenuItem'); // Import your MenuItem model

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://prinuvinod:blahblah123@cluster0.398ttkq.mongodb.net/cluster0?retryWrites=true&w=majority', {
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

app.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();

    res.render('homepage', { menu: menuItems });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/menu', menuRoutes);
app.use('/additem', additemRoutes);
app.use('/toorder', toorderRoutes);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/`);
});
