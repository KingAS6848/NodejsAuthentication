const mongoose = require('mongoose');

// Define the otp schema using mongoose.Schema
const otpSchema = new mongoose.Schema({
  
  email: String,
 
  code: String,

}, {

  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the Otp model using the otpSchema and specifying the collection name as 'otp'
const otp = mongoose.model('otp', otpSchema, 'otp');


module.exports = otp;
