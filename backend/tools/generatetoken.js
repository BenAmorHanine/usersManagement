const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
  
  return jwt.sign(
    { id: user._id, role: user.role }, // Payload
    process.env.JWT_SECRET || "3815012190", // Secret key
    { expiresIn: '1h' } // Options
  );
};

module.exports = generateToken;