// utils/validateUserData.js
function validateUserData({ username, email, password }) {
  // Add your validation logic here (e.g., regex for email, password strength)
  if (!username || typeof username !== 'string') {
    return 'Invalid username';
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return 'Invalid email';
  }
  if (!password || password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  return null;
}

module.exports = validateUserData;
