const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// Function to handle user registration
const registerUser = (req, res) => {
  // Schema to validate incoming data
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
  });

  // Check if the input is valid
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { username, password, email } = req.body;

  // Check if the username is already taken
  if (userModel.findByUsername(username)) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  // Hash the password so it can't be read directly
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  // Add the new user to our "database"
  const newUser = userModel.createUser(username, hashedPassword, email);

  res.status(201).json({ message: 'User registered successfully', user: newUser });
};

// Function to handle user login
const loginUser = (req, res) => {
  // Schema to validate incoming login data
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
  });

  // Check if the input is valid
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { username, password } = req.body;
  
  // Find the user by username
  const user = userModel.findByUsername(username);

  // Check if the user exists and if the password matches
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  // Create a token that the user can use to access protected routes
  const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1h' });
  res.status(200).json({ message: 'Login successful', token });
};

// Function to handle getting user profile details
const getUserProfile = (req, res) => {
  // Find the user using the ID from the token
  const user = userModel.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Send back the user details
  res.status(200).json({ user });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
