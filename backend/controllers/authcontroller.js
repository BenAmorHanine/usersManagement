const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/usermodel');
const Role = require('../models/rolemodel');
const validateUserData  = require('../tools/validateUserData');
const generateToken  = require('../tools/generatetoken');

require('dotenv').config();

exports.signup = async (req, res) => {
    try {
      const { username, email, password, role } = req.body;
  
      // Validate input
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
      }
  
      const validationError = validateUserData({ username, email, password });
      if (validationError) {
        return res.status(400).json({ message: validationError });
      }
  
      // Check if user with the given email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Find the role in the database
    let userRoleId = '668686173781f594882a1d37'; // Default role ObjectId for simple-user
    if (role) {
      const userRole = await Role.findOne({ name: role });
      if (!userRole) {
        return res.status(400).json({ message: 'Invalid role' });
      }
      userRoleId = userRole._id;
    }
      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role: userRoleId
      });
  
      await newUser.save();
  
      // Generate a token for the new user
      const secret = process.env.JWT_SECRET || 'default_secret_key';
      const token = generateToken(newUser,secret);
  
      res.status(201).json({ token, role: userRole.name });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate('role');

   
    if (!user || !(await bcrypt.compare(password, user.password))) {
        console.log('Authentication failed');
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const secret = process.env.JWT_SECRET || 'default_secret_key';
    const token = generateToken(user, secret);

    res.json({ token, role: user.role.name, message: "Welcome" });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

