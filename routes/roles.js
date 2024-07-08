// routes/roles.js
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController.js');


// Routes pour les rôles
router.post('/roles', roleController.createRole);
router.get('/roles', roleController.getAllRoles);
router.get('/roles/:id', roleController.getRoleById);
router.get('/roles/by-username/:username', roleController.getRoleByUsername);
router.put('/roles/:id', roleController.updateRoleById);
router.delete('/roles/:id', roleController.deleteRoleById);

module.exports = router;