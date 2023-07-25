# NodejsAuthentication


Node.js Authentication Project with OTP using Nodemailer
This is a Node.js authentication project that allows users to sign up, sign in, reset their password using OTP, and logout. The project utilizes Nodemailer to send OTPs to users' email addresses for password reset functionality.

Table of Contents
Introduction
Features
Installation
Usage
Dependencies
Contributing
License
Introduction
This Node.js authentication project provides a simple yet secure user authentication system. Users can register for an account, sign in with their credentials, request a password reset using OTP verification through email, and log out.

Features
User registration with email and password
Email verification using OTP during password reset
Password hashing for enhanced security
User sessions for authentication
Logout functionality
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/your-username/nodejs-authentication-otp.git
Install dependencies:
npm install



Start the server:
bash
Copy code
npm start
Usage
Open your web browser and navigate to http://localhost:8000.

Sign Up: Click on the "Sign Up" link to create a new account by providing a valid email address and password.

Sign In: After signing up, use the same email and password to log in.

Reset Password: Once logged in, you can find an option to reset your password. Click on it, and an OTP will be sent to your registered email address.

Logout: To log out, click on the "Logout" link in the navigation bar.

Dependencies
This project relies on the following major dependencies:

Express: Web application framework for Node.js
MongoDB: NoSQL database to store user information
Mongoose: MongoDB object modeling tool
Express-Session: Session middleware for Express
Nodemailer: Module for sending emails with Node.js
Bcrypt: Password hashing library for Node.js
These dependencies, along with their versions, can be found in the package.json file.
