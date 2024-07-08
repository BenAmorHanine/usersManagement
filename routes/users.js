// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkPermission = require('../tools/checkPermission');

router.post('/users',checkPermission('add-user'), userController.createUser); //l'admin kahaw
router.get('/users',checkPermission('view-list-all-users'), userController.getAllUsers);
router.get('/users/:id',checkPermission('get-by-id'), userController.getUserById);
router.put('/users/:id',checkPermission('update-own-data'), userController.updateUserById); //fait attention ennou kol had ybadl ken ses propres données
router.delete('/users/:id', userController.deleteUserById); //hethy fiha barsha khedma khtr amalt barsha delete permission eny

router.post('/users',authMiddleware('admin'), userController.createUser); //l'admin kahaw
router.get('/users',authMiddleware('admin'), userController.getAllUsers);
router.get('/users',authMiddleware(['admin','responsible-dev']), userController.getdevs);
router.get('/users',authMiddleware(['admin','responsible-test']), userController.gettestors);
router.get('/users/:id',authMiddleware('admin'), userController.getUserById);
router.put('/users/:id',checkPermission('update-own-data'), userController.updateUserById); //fait attention ennou kol had ybadl ken ses propres données
router.delete('/users/:id', userController.deleteUserById); //hethy fiha barsha khedma khtr amalt barsha delete permission eny

module.exports = router;

