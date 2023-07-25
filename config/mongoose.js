const mongoose = require('mongoose');
require("dotenv").config()
// Connect to the MongoDB database at the specified URL
mongoose.connect(process.env.DATABASE);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

// Event listener for successful connection
db.once('open', function() {
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;
