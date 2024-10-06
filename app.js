const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const loggingMiddleware = require('./middleware/loggingMiddleware');
const path = require('path');

const app = express();

// Middleware to handle JSON data in requests
app.use(bodyParser.json());

// Middleware to log every request (method, URL, timestamp)
app.use(loggingMiddleware);

// Set up routes for user-related operations
app.use('/api', userRoutes);

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;
// Start the server on port 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
