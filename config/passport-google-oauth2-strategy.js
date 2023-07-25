const passport = require('passport');
const crypto = require('crypto');
const googleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/user');
const mongoose = require('mongoose'); // Add this line for ObjectId conversion




passport.use(new googleStrategy({
    clientID: '659492547346-stjbhvdnrtmvokqd397p8oo64thsj2np.apps.googleusercontent.com', // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
    clientSecret: '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', // e.g. _ASDFA%KFJWIASDFASD#FAD-
    callbackURL: "http://localhost:8000/users/auth/google/callback",
},







function(accessToken, refreshToken, profile, done) {
    // find a user
    User.findOne({ email: profile.emails[0].value })
      .then((user) => {
        // console.log(accessToken, refreshToken);
        // console.log(profile);
  
        if (user) {
          // if found, set this user as req.user
          return done(null, user);
        } else {
          // if not found, create the user and set it as req.user
          User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString('hex')
          })
            .then((newUser) => {
              return done(null, newUser);
            })
            .catch((err) => {
              console.log('error in creating user google strategy-passport', err);
              return done(err);
            });
        }
      })
      .catch((err) => {
        console.log('error in google strategy-passport', err);
        return done(err);
      });
  }
))

module.exports = passport;
