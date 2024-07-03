// routes/permissions.js
const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');

// Routes pour les permissions
router.post('/permissions', permissionController.createPermission);
router.get('/permissions', permissionController.getAllPermissions);
router.get('/permissions/:id', permissionController.getPermissionById);
router.put('/permissions/:id', permissionController.updatePermissionById);
router.delete('/permissions/:id', permissionController.deletePermissionById);

module.exports = router;
