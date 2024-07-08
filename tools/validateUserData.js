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
  module.exports = {validateUserData,};