// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.createUser1);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);

/*
// Route POST pour créer un utilisateur
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, roleId } = req.body;

    // Création d'un nouvel utilisateur
    const newUser = new User({ username, email, password, role: roleId });

    // Sauvegarde de l'utilisateur dans la base de données
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès.', user: newUser });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});
*/
module.exports = router;
