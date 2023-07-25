const User = require('../models/user');
const bcrypt = require('bcrypt');
const Otp = require('../models/otp');
const nodemailer = require('nodemailer');
require('dotenv').config()

// Render Sign Up Form
module.exports.signUp = function (req, res) {
  res.render('user_signup', {
    title: 'Sign Up',
  });
};

// Render Sign In Form
module.exports.signIn = function (req, res) {
  res.render('user_signin', {
    title: 'Sign In',
  });
};

// Render Reset Form
module.exports.reset_form_page = function (req, res) {
  if (req.isAuthenticated()) {
    return res.render('reset_password', {
      title: 'Reset',
    });
  }
};

// Render OTP and Password to change password page
module.exports.newpass = function (req, res) {
  return res.render('new_pass', {
    title: 'Change Password',
  });
};

// Create User Account
module.exports.create = async function (req, res) {
  const hash = await bcrypt.hash(req.body.password, 10);

  if (req.body.password != req.body.confirm_password) {
    req.flash('error', 'Passwords do not match');
    return res.redirect('back');
  }

  try {
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        })
          .then((user) => {
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('/users/sign-in');
          })
          .catch((err) => {
            if (err) {
              req.flash('error', err);
              return;
            }
          });
      } else {
        console.log('error');
        return res.redirect('back');
      }
    });
  } catch (error) {
    console.log('error in module User_controller create', error);
  }
};

// Sign in and create a session for the user
module.exports.createSession = function (req, res) {
  req.flash('success', 'Logged in Successfully');
  return res.redirect('/');
};

// Logout Session
module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Logged out Successfully');
    res.redirect('/users/sign-in');
  });
};

// Reset Password
module.exports.reset_password = async function (req, res) {
  const hash = await bcrypt.hash(req.body.password, 10);

  User.findById(req.params.id)
    .then((user) => {
      if (req.body.password == req.body.confirm_password) {
        user.password = hash;
        user.save();
        req.flash('success', 'Successfully Changed');
        return res.redirect('/users/sign-out');
      }
      req.flash('error', 'Invalid Password');
      return res.redirect('back');
    })
    .catch((err) => {
      console.log('Error in resetting the password', err);
    });
};

module.exports.forgot = function (req, res) {
  res.render('forgot_pass', {
    title: 'Forgot Password',
  });
};

// Send OTP to Forgot Password
module.exports.emailsend = async function (req, res) {
  let data = await User.findOne({ email: req.body.email });
  if (data) {
    let otpcode = Math.floor(Math.random() * 10000 + 1);
    let otpData = new Otp({
      email: req.body.email,
      code: otpcode,
      expireIn: new Date().getTime() + 300 * 1000,
    });
    let otpResponse = await otpData.save();
    console.log('success', otpResponse);


    // Create a Nodemailer transporter using your email configuration
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      port: 465,
      secure: true,
      logger: true,
      debug: true,
      secureConnection: false,
      auth: {
        user: process.env.EMAIL, // Replace with your Gmail email
        pass: process.env.PASSWORD, // Replace with your Gmail password or app password
      },
      tls: {
        rejectUnauthorized: true
      }
    });
    // Setup email data
    let mailOptions = {
      from: process.env.EMAIL, // Replace with your Gmail email
      to: data.email,
      subject: "Your One-Time Password (OTP) ",
      text: `

        Dear ${data.name}, 

        To reset your password, please use the following OTP:

        OTP: ${otpcode}
        
        Please enter this OTP on the reset password page within the next 15 mintues`
    };

    await transporter.sendMail(mailOptions);

    return res.redirect('/users/newpass');
  } else {
    req.flash('error', 'Invalid Details');
    console.log('data not found');
    return res.redirect('back');
  }
};

// Enter new OTP and Password and Submit to Change the password
module.exports.changepassword = async function (req, res) {
  const hash = await bcrypt.hash(req.body.password, 10);

  let data = await Otp.find({ email: req.body.email, code: req.body.code });
  if (data) {
    let CurrentTime = new Date().getTime();
    let diff = data.expireIn - CurrentTime;
    if (diff < 0) {
      console.log('token expired');
    } else {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        // console.log(user,"not user");
        return;
      }
      // console.log(user,"user");
      if (req.body.password == req.body.confirm_password) {
        user.password = hash;
        user.save();
        req.flash('success', 'Password Change Successfully');
        return res.redirect('/users/sign-in');
      }
      req.flash('error', "Passwords Didn't Match");
      return res.redirect('back');
    }
  } else {
    req.flash('error', 'Invalid Details');
    console.log('Invalid token or token expired');
    return res.redirect('back');
  }
};
