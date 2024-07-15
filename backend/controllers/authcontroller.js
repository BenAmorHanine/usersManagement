const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/usermodel');
const Role = require('../models/rolemodel');
const validateUserData  = require('../tools/validateUserData.js');
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
        console.log("user already exists");
        return res.status(400).json({ message: 'Email already exists' });
      }
      
  
      // Hash the password before saving
      const salt =10;
      const hashedPassword = await bcrypt.hash(password, salt);
    
  
      // Find the role in the database
    let userRoleId = '66869b9a47974d16f17f820e'; // Default role ObjectId for simple-user
    let userRoleName = 'simple-user'; // Default role name
    if (role) {
      const userRole = await Role.findOne({ name: role });
      if (!userRole) {
        return res.status(400).json({ message: 'Invalid role' });
      }
      userRoleId = userRole._id;
      userRoleName = userRole.name;
    }
      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role: userRoleId,
      });
  
      await newUser.save();
  
      // Generate a token for the new user
      const secret = process.env.JWT_SECRET || 'default_secret_key';
     const token = generateToken(newUser,secret);
  
      res.status(201).json({ token, role: userRoleName });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('Email or password missing in request body');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email }).populate('role');

   
    if (!user) {
      console.log('Authentication failed, User not found!');
      return res.status(401).json({ message: 'Invalid email ' });
    }

    // Compare plaintext password
    if (!(bcrypt.compare(password, user.password))) {
      console.log('Authentication failed, Invalid password');
      return res.status(401).json({ message: 'Invalid password' });
    }

    const secret = process.env.JWT_SECRET || 'default_secret_key';
    const token = generateToken(user, secret);

    res.json({ user: user.username, role: user.role.name, message: "Welcome" });
    console.log("welcome");
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

