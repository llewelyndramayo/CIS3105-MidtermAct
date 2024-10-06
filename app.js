const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const loggingMiddleware = require("./middleware/loggingMiddleware");
const path = require("path");
const { rateLimit } = require("express-rate-limit");

const app = express();

// Limit API Request
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 100, 
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

// Middleware to handle JSON data in requests
app.use(bodyParser.json());

// Middleware to log every request (method, URL, timestamp)
app.use(loggingMiddleware);

app.use(limiter);

// Set up routes for user-related operations
app.use("/api", userRoutes);

const PORT = 8080;
// Start the server on port 8080
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
