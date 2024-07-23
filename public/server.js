// const express = require('express');
// const path = require('path');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const db = require('./config/db');
// const session = require('express-session');
// const passport = require('passport');
// const authRoutes = require('./routes/auth');
// const indexRoutes = require('./routes/index');
// const eventRoutes = require('./routes/event');
// const postRoutes = require('./routes/post');
// const homeRoutes = require('./routes/home');
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Database connection
// db();

// // Middleware setup
// app.use(cors());
// app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(session({
//   secret: 'your secret key',
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// app.set('views', path.join(__dirname, 'views'));

// // Passport Configuration
// require('./config/passport');

// // Route setup
// app.use('/', indexRoutes);
// app.use('/', homeRoutes);
// app.use('/auth', authRoutes);
// app.use('/', postRoutes);
// app.use('/', eventRoutes);

// // Routes
// app.get('/login', (req, res) => res.render('login'));
// app.get('/signup', (req, res) => res.render('signup'));
// app.get('/hi', (req, res) => res.send("hello world"));
// app.get('/try', (req, res) => res.render('try'));
// app.get('/ev', (req, res) => res.render('event'));

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');
const eventRoutes = require('./routes/event');
const postRoutes = require('./routes/post');
const homeRoutes = require('./routes/home');
const Item = require('./models/item'); 
const Events = require('./models/event');
const items = require('./models/item');
const Echo = require('./models/data');
const itemRoutes = require('./routes/product');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
db();

// Middleware setup
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));

// Passport Configuration
require('./config/passport');

// Route setup
app.use('/', indexRoutes);
app.use('/', homeRoutes);
app.use('/auth', authRoutes);
app.use('/', postRoutes);
app.use('/', eventRoutes);
app.use('/',itemRoutes)
// Routes
app.get('/login', (req, res) => res.render('login'));
app.get('/signup', (req, res) => res.render('signup'));
app.get('/hi', (req, res) => res.send("hello world"));
app.get('/try', (req, res) => res.render('try'));
app.get('/ev', (req, res) => res.render('event'));
app.get('/cart', (req, res) => {
  res.render('cart');
});
app.get('/blog', async(req, res) => {
  try {
    const data = await Echo.find({});

    if (data.length > 0 ) {
      res.render('blogspage', { blogs: data, user: req.session.user });
      console.log({ data });
    } else {
      res.render('blogspage', { blogs: [], user: req.session.user });
      console.log('No data or events found');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/event', async(req, res) => {
  try {
    const events = await Events.find({});

    if ( events.length > 0) {
      res.render('eventpage', { events: events, user: req.session.user });
      console.log({ events });
    } else {
      res.render('eventpage', { blogs: [], user: req.session.user });
      console.log('No data or events found');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/shop', async(req, res) => {
  try {
    const items = await Item.find({})

    if ( items.length > 0) {
      res.render('shoppage', { items: items, user: req.session.user });
      console.log({  items});
    } else {
      res.render('shoppage', { blogs: [], user: req.session.user });
      console.log('No data or events found');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

