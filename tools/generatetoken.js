const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role }, // Payload
    process.env.JWT_SECRET, // Secret key
    { expiresIn: '1h' } // Options
  );
};

module.exports = generateToken;


//ma naarsh emta nsttamlou qali alih waqt fassarli lpartie loula (protect function) mtea authmiddleware:
//heres the example he gave me :
//ama eny amalt ythhorli haja haka fl authcontroller fl login belk nwali juste naaml modulation du code ken naffsou o khw
/*
// Example login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Generate a token
      const token = generateToken(user);
  
      // Send the token to the client
      res.json({ token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  */