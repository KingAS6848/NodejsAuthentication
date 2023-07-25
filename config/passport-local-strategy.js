const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy;

// Configure the local strategy with a custom verify function
const localStrategy = new LocalStrategy({usernameField: 'email',passwordField: 'password'},async (email, password, done) => {
    try {
      // Find the user with the given username
      const user = await User.findOne({ email });
  
      // If the user does not exist, return an error
      if (!user) {
        console.log('User not found');
        return done(null, false, { message: 'Incorrect email' });
      }

      
      //decrypt and check password from stored one
      const passwordMatches = await bcrypt.compare(password, user.password);

  
      //verify password
      if (!passwordMatches) {
        console.log('Invalid password');
        return done(null, false);
      }
      
  
      // Otherwise, return the user object
      return done(null, user);
      
    } catch (err) {
        console.log('Error while authenticating user');
      return done(err);
    }
  });

passport.use(localStrategy);

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});




// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {


    User.findById(id)
        .then((user) => {
            return done(null, user);
        })
        .catch((err) => {
            console.log('Error in finding user --> Passport');
            return done(err);
        })



});


// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()) {
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}



module.exports = passport;