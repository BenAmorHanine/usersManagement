const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/usermodel');
const Role = require('../models/rolemodel');
require('dotenv').config();

//pour verifier la validité des données
const validateUserData = (user) => {
    if (typeof user.username !== 'string' || user.username.length < 3 || user.username.length > 30) {
      return 'Le nom d\'utilisateur est invalide.';
    }
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      return 'L\'adresse email est invalide.';
    }
  
    if (typeof user.password !== 'string' || user.password.length < 6) {
      return 'Le mot de passe doit contenir au moins 6 caractères.';
    }
  
    return null;
  };

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
      const userRole = await Role.findOne({ name: role });
      if (!userRole) {
        return res.status(400).json({ message: 'Invalid role' });
      }
  
      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role: userRole._id
      });
  
      await newUser.save();
  
      // Generate a token for the new user
      const token = jwt.sign({ userId: newUser._id, role: userRole.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({ token, role: userRole.name });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Received email:', email); // Check what email is received
    console.log('Received password:', password); // Check what password is received

    const user = await User.findOne({ email }).populate('role');

    console.log('Found user:', user); // Check the user object returned from the database
   // if(!user || password !== user.password){
    if (!user || !(await bcrypt.compare(password, user.password))) {
        console.log('Authentication failed'); // Add a log to check if authentication failed
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const secret = process.env.JWT_SECRET || 'default_secret_key';
    const token = jwt.sign({ userId: user._id, role: user.role.name }, secret, { expiresIn: '5h' });
    res.json({ token, role: user.role.name, message: "Welcome" });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
