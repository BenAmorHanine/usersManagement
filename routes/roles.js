// routes/roles.js
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');


// Routes pour les rôles
router.post('/roles', roleController.createRole);
router.get('/roles', roleController.getAllRoles);
router.get('/roles/:id', roleController.getRoleById);
router.get('/roles/by-username/:username', roleController.getRoleByUsername);
router.put('/roles/:id', roleController.updateRoleById);
router.delete('/roles/:id', roleController.deleteRoleById);

/*
// Route POST pour créer un rôle
router.post('/roles', async (req, res) => {
  try {
    const { name, permissions } = req.body;

    // Création d'un nouveau rôle
    const newRole = new Role({ name, permissions });

    // Sauvegarde du rôle dans la base de données
    await newRole.save();

    res.status(201).json({ message: 'Rôle créé avec succès.', role: newRole });
  } catch (error) {
    console.error('Erreur lors de la création du rôle:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});
*/

module.exports = router;

