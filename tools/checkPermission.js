const User = require('../models/usermodel');
const Role = require('../models/rolemodel');
const Permission = require('../models/Permissionmodel');

const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const userId = req.userId; // supposant que l'utilisateur est déjà authentifié et l'ID utilisateur est disponible
      const user = await User.findById(userId).populate('role');
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }

      const userRole = await Role.findById(user.role).populate('permissions');
      const hasPermission = userRole.permissions.some(permission => permission.name === requiredPermission);

      if (!hasPermission) {
        return res.status(403).json({ message: 'Accès refusé. Permission manquante.' });
      }

      next();
    } catch (error) {
      console.error('Erreur lors de la vérification des permissions:', error);
      res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  };
};

module.exports = checkPermission;
