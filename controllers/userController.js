
const User = require('../models/usermodel');

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


// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, roleId } = req.body;
    if (!username || !email || !password || !roleId) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
      }

      const validationError = validateUserData({ username, email, password });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }
    const newUser = new User({ username, email, password, role: roleId });
    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès.', user: newUser });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé.' });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    //pour verifier la validité des données des données
    const validationError = validateUserData(user);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur par ID:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Mettre à jour un utilisateur par ID
exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, password, roleId } = req.body;
    //pour verifier la validité des données des données
    const validationError = validateUserData({ username, email, password });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }
    const updatedUser = await User.findByIdAndUpdate(userId, { username, email, password, role: roleId }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    res.status(200).json({ message: 'Utilisateur mis à jour avec succès.', user: updatedUser });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur par ID:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Supprimer un utilisateur par ID
exports.deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    res.status(200).json({ message: 'Utilisateur supprimé avec succès.', user: deletedUser });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur par ID:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
