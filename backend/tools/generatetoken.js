const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
  
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role.name ,createdAt: user.createdAt}, // Payload
    process.env.JWT_SECRET ,//|| "3815012190", // Secret key
    { expiresIn: '3h' } // Options
  );
};

module.exports = generateToken;