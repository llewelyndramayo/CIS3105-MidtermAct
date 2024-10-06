// Middleware to log info about incoming requests
const loggingMiddleware = (req, res, next) => {
    // Log the current time, request method, and URL
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    
    // Move on to the next piece of middleware or the route
    next();
  };
  
  module.exports = loggingMiddleware;
  