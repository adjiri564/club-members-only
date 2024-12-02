// app.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const membershipRoutes = require('./routes/membership');
const messageRoutes = require('./routes/messages');
const homeRoutes = require('./routes/home');
const usersRoutes = require('./routes/users')
const initializePassport = require('./config/passport-config'); // Assuming you have a passport config file
const methodOveride = require('method-override')


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Middleware for parsing application/json
app.use(express.json());

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOveride('_method'));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


// Set view engine
app.set('view engine', 'ejs'); // Using EJS as the templating engine
app.use(express.static('public')); // Serve static files from the public directory


// Authentication middleware
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Routes
app.use('/', authRoutes);
app.use('/', membershipRoutes);
app.use('/', messageRoutes);
app.use('/', homeRoutes);
app.use('/', usersRoutes)

// Protect routes
app.get('/create-message', ensureAuthenticated, (req, res) => {
    res.render('create-message'); // Render the message creation view
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});