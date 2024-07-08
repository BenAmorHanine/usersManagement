// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../tools/authMiddleware');
const checkPermission = require('../tools/checkPermission');
/*
router.post('/users',checkPermission('add-user'), userController.createUser); //l'admin kahaw
router.get('/users',checkPermission('view-list-all-users'), userController.getAllUsers);
router.get('/users/:id',checkPermission('get-by-id'), userController.getUserById);
router.put('/users/:id',checkPermission('update-own-data'), userController.updateUserById); //fait attention ennou kol had ybadl ken ses propres données
router.delete('/users/:id', userController.deleteUserById); //hethy fiha barsha khedma khtr amalt barsha delete permission eny
*/
//every user:
router.delete('/profile', authMiddleware.protect, userController.deleteUserAccount); // Delete own account
router.put('/profile', authMiddleware.protect, userController.updateUserAccount); // update own account (except his role)
router.get('/profile', authMiddleware.protect, userController.getUserData); // get own data
//the create hayka fl auth.js : signup
//affichage:
router.get('/users',authMiddleware.protect,authMiddleware.restrictTo('admin'), userController.getAllUsers);
router.get('/users',authMiddleware.protect,authMiddleware.restrictTo('admin'), userController.getCondidats); //getsimpleusersmaaneha
router.get('/users',authMiddleware.protect,authMiddleware.restrictTo(['admin','responsible-dev']), userController.getDevs);
router.get('/users',authMiddleware.protect,authMiddleware.restrictTo(['admin','responsible-test']), userController.getTestors);
router.get('/users/:id',authMiddleware.protect,authMiddleware.restrictTo('admin'), userController.getUserById);


router.post('/users',authMiddleware.protect,authMiddleware.restrictTo('admin'), userController.createUser); //l'admin kahaw

router.put('/users/:id',authMiddleware.protect,authMiddleware.restrictTo('admin'), userController.updateUserById);
router.put('/users/:id',authMiddleware.protect,authMiddleware.restrictTo(['admin','responsible-dev']), userController.updateRoleToDev);
router.put('/users/:id',authMiddleware.protect,authMiddleware.restrictTo(['admin','responsible-testor']), userController.updateRoleToTestor);
router.put('/users/:id',authMiddleware.protect,authMiddleware.restrictTo('admin'), userController.updateRoleToRespDev);
router.put('/users/:id',authMiddleware.protect,authMiddleware.restrictTo('admin'), userController.updateRoleToRespTest);
router.put('/users/:id',authMiddleware.protect,authMiddleware.restrictTo('admin'), userController.updateUserById);

router.delete('/users/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), userController.deleteUserById); // Admin deleting a user

router.put('/users/:id/removeResp', authMiddleware.protect, authMiddleware.restrictTo('admin'), userController.removeWorkerFromJob); // Admin ydesmisionni responsable
router.put('/users/:id/removeDev', authMiddleware.protect, authMiddleware.restrictTo(['admin','responsible-dev']), userController.removeWorkerFromJob); // démisionner dev
router.put('/users/:id/removeTest', authMiddleware.protect, authMiddleware.restrictTo(['admin','responsible-testor']), userController.removeWorkerFromJob); // démisionner test


module.exports = router;