const jwt = require('jsonwebtoken');
require('dotenv').config();
const Role = require('../models/rolemodel');

exports.protect = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {console.log('No token found');
    return res.status(401).json({ message: 'Unauthorized1 - No token found' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err){
      console.error('JWT verification error:', err);
       return res.status(401).json({ message: 'Unauthorized2 - Invalid token' });
       }
    req.user = decoded; //to Attach the decoded user information to the request object
    console.log('Decoded user:', decoded);
    next();
  });
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log('User role:', req.user.role); // Log to see actual role value
    console.log('Allowed roles:', roles); // Log allowed roles
    if (!roles.includes(req.user.role)) { // Check if role is included
      console.log('Forbidden: Role not allowed');
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};


