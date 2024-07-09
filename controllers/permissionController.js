// controllers/permissionController.js
const Permission = require('../models/Permissionmodel');

// Créer une nouvelle permission
exports.createPermission = async (req, res) => {
  try {
    const { name } = req.body;
    const newPermission = new Permission({ name });
    await newPermission.save();
    res.status(201).json({ message: 'Permission créée avec succès.', permission: newPermission });
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Obtenir toutes les permissions
exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Obtenir une permission par ID
exports.getPermissionById = async (req, res) => {
  try {
    const permissionId = req.params.id;
    const permission = await Permission.findById(permissionId);
    if (!permission) {
      return res.status(404).json({ message: 'Permission non trouvée.' });
    }
    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Mettre à jour une permission par ID
exports.updatePermissionById = async (req, res) => {
  try {
    const permissionId = req.params.id;
    const updatedPermission = await Permission.findByIdAndUpdate(permissionId, req.body, { new: true });
    if (!updatedPermission) {
      return res.status(404).json({ message: 'Permission non trouvée.' });
    }
    res.status(200).json(updatedPermission);
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Supprimer une permission par ID
exports.deletePermissionById = async (req, res) => {
  try {
    const permissionId = req.params.id;
    const deletedPermission = await Permission.findByIdAndDelete(permissionId);
    if (!deletedPermission) {
      return res.status(404).json({ message: 'Permission non trouvée.' });
    }
    res.status(200).json({ message: 'Permission supprimée avec succès.', permission: deletedPermission });
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
