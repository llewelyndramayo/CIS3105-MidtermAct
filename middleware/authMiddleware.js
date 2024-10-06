const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
const authMiddleware = (req, res, next) => {
  // Get the token from the "authorization" header
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  // Extract the token (after "Bearer")
  const token = authHeader.split(' ')[1];
  
  // Verify the token
  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    
    // Attach the user data to the request, so we can use it in other routes
    req.user = user;
    next();
  });
};

module.exports = authMiddleware;
