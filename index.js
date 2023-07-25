const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);

// Extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Set up session using express-session
app.use(session({
  name: 'NodejsAuthentication',
  // TODO: Change the secret before deployment in production mode
  secret: 'blahsomethinh',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: (1000 * 60 * 100), // 100 minutes
  },
  store: new MongoStore(
    {
      mongooseConnection: db,
      autoRemove: 'disabled',
    },
    function (err) {
      console.log(err || 'connect-mongodb setup ok');
    }
  ),
}));

// Initialize passport and session for authentication
app.use(passport.initialize());
app.use(passport.session());

// Set authenticated user in locals
app.use(passport.setAuthenticatedUser);

// Use flash for showing messages
app.use(flash());

// Custom middleware to set flash messages in res.locals
app.use(customMware.setFlash);

// Use express router
app.use('/', require('./routes'));

// Start the server
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
