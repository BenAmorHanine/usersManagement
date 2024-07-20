// controllers/roleController.js
const Role = require('../models/rolemodel');

// Créer un nouveau rôle
exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const newRole = new Role({ name });
    await newRole.save();
    res.status(201).json({ message: 'Rôle créé avec succès.', role: newRole });
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Obtenir tous les rôles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Obtenir un rôle par ID
exports.getRoleById = async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Rôle non trouvé.' });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Mettre à jour un rôle par ID
exports.updateRoleById = async (req, res) => {
  try {
    const roleId = req.params.id;
    const updatedRole = await Role.findByIdAndUpdate(roleId, req.body, { new: true });
    if (!updatedRole) {
      return res.status(404).json({ message: 'Rôle non trouvé.' });
    }
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Obtenir un rôle par le nom d'utilisateur
exports.getRoleByUsername = async (req, res) => {
    try {
      const username = req.params.username;
      const user = await User.findOne({ username }).populate('role');
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
      res.status(200).json(user.role);
    } catch (error) {
      res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  };

// Supprimer un rôle par ID
exports.deleteRoleById = async (req, res) => {
  try {
    const roleId = req.params.id;
    const deletedRole = await Role.findByIdAndDelete(roleId);
    if (!deletedRole) {
      return res.status(404).json({ message: 'Rôle non trouvé.' });
    }
    res.status(200).json({ message: 'Rôle supprimé avec succès.', role: deletedRole });
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
