const mongoose = require('mongoose');

// Connect to the MongoDB database at the specified URL
mongoose.connect('mongodb://127.0.0.1:27017/authApp2');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

// Event listener for successful connection
db.once('open', function() {
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;
