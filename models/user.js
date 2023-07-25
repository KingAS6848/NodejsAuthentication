const mongoose = require('mongoose');

// Define the user schema using mongoose.Schema
const userSchema = new mongoose.Schema({
  // Email field, must be a string and is required (not nullable) and unique
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Password field, must be a string and is required (not nullable)
  password: {
    type: String,
    required: true,
  },
  // Name field, must be a string and is required (not nullable)
  name: {
    type: String,
    required: true,
  },
}, {

  timestamps: true, 
});

// Create the User model 
const User = mongoose.model('User', userSchema);

// Export the User model to be used in other parts of the application
module.exports = User;
