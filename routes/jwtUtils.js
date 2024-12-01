const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret-warehouse';

// Middleware to verify the token
function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
  
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }
  
      req.user = decoded;
      next();
    });
  }
  
  // Middleware to verify user role
  function verifyRole(role) {
    return (req, res, next) => {
      if (req.user.role !== role) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    };
  }

  module.exports = {
    verifyToken,
    verifyRole,
  };
