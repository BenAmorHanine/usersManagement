const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.protect = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {console.log('No token found');
    return res.status(401).json({ message: 'Unauthorized1' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err){
      console.error('JWT verification error:', err);
       return res.status(401).json({ message: 'Unauthorized2' });
       }
    req.user = decoded; //to Attach the decoded user information to the request object
    console.log('Decoded user:', decoded);
    next();
  });
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};
