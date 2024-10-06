const data = require('../data/users.json')

// Array to hold all the users (acting as our "database")
let users = data || [];
let userId = 1;

// Function to create a new user and add them to our array
const createUser = (username, password, email) => {
  const newUser = { id: userId++, username, password, email };
  users.push(newUser);
  return newUser;
};

// Function to find a user by their username
const findByUsername = (username) => {
  return users.find((user) => user.username === username);
};

// Function to find a user by their ID
const findById = (id) => {
  return users.find((user) => user.id === id);
};

module.exports = {
  createUser,
  findByUsername,
  findById,
};
