const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

// Route for displaying the sign-up form
router.get('/sign-up', usersController.signUp);

// Route for displaying the sign-in form
router.get('/sign-in', usersController.signIn);

// Route for creating a new user account
router.post('/create', usersController.create);

// Route for authenticating user credentials using the 'local' strategy from Passport
router.post('/create-session', passport.authenticate(
  'local',
  { failureRedirect: '/users/sign-in' },
), usersController.createSession);

// Route for signing out the authenticated user
router.get('/sign-out', passport.checkAuthentication, usersController.destroySession);

// Route for initiating Google OAuth authentication with required scope
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route to handle Google OAuth callback after successful authentication
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/users/sign-in' }), usersController.createSession);

// Route for displaying the reset password form
router.get('/reset-form', passport.checkAuthentication, usersController.reset_form_page);

// Route for handling password reset
router.post('/reset-password/:id', passport.checkAuthentication, usersController.reset_password);

// Route for displaying the forgot password form
router.get('/forgot', usersController.forgot);

// Route for sending a password reset email
router.post('/emailsend', usersController.emailsend);

// Route for displaying the new password form
router.get('/newpass', usersController.newpass);

// Route for handling password change
router.post('/change-password', usersController.changepassword);

module.exports = router;
