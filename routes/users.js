const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);


router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);


router.get('/sign-out', passport.checkAuthentication ,usersController.destroySession);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/users/sign-in'}), usersController.createSession);
router.get('/reset-form' , passport.checkAuthentication, usersController.reset_form_page);
router.post('/reset-password/:id',passport.checkAuthentication,usersController.reset_password);
router.get('/forgot',usersController.forgot);
router.post('/emailsend',usersController.emailsend);
router.get('/newpass',usersController.newpass)
router.post('/change-password',usersController.changepassword);
module.exports = router;