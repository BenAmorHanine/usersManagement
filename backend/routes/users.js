// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../tools/authMiddleware');

//user actions
router.delete('/profile', authMiddleware.protect, userController.deleteUserAccount); // Delete own account
router.put('/profile', authMiddleware.protect, userController.updateUserAccount); // update own account (except his role)
router.get('/profile', authMiddleware.protect, userController.getUserData); // get own data


router.post('/users/create',authMiddleware.protect,authMiddleware.restrictTo('admin'), userController.createUser); //l'admin kahaw

//get actions
router.get('/users/all',authMiddleware.protect,authMiddleware.restrictTo('admin'), userController.getAllUsers);
router.get('/users/appliers',authMiddleware.protect,authMiddleware.restrictTo('admin'), userController.getAppliers); //getsimpleusersmaaneha
router.get('/users/developers',authMiddleware.protect,authMiddleware.restrictTo('admin','responsible-dev'), userController.getDevs);
router.get('/users/testors',authMiddleware.protect,authMiddleware.restrictTo('admin','responsible-testor'), userController.getTestors);
router.get('/users/responsibles',authMiddleware.protect,authMiddleware.restrictTo('admin','responsible-testor', 'responsible-dev'), userController.getresps);
router.get('/users/:id',authMiddleware.protect,authMiddleware.restrictTo('admin'), userController.getUserById);
//bsh nzidou haja de telle facon kol resp puisque andou lhaq yshouf liste des ing yshouf leurs details

//admin only
router.put('/users/:id',authMiddleware.protect,authMiddleware.restrictTo('admin'), userController.updateUserById);

router.delete('/users/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), userController.deleteUserById); // Admin deleting a user

//updating roles and data
router.put('/users/:id/role/dev',authMiddleware.protect,authMiddleware.restrictTo('admin','responsible-dev'), userController.updateRoleToDev);
router.put('/users/:id/role/testor',authMiddleware.protect,authMiddleware.restrictTo('admin','responsible-testor'), userController.updateRoleToTestor);
router.put('/users/:id/role/responsible-dev',authMiddleware.protect,authMiddleware.restrictTo('admin'), userController.updateRoleToRespDev);
router.put('/users/:id/role/responsible-testor',authMiddleware.protect,authMiddleware.restrictTo('admin'), userController.updateRoleToRespTest);
router.put('/users/:id/role/admin',authMiddleware.protect,authMiddleware.restrictTo('admin'), userController.updateRoleToAdmin);

//removing(updating to simple-user)
// ofc this is safe bcause only every responsible is allowed to see workers under him
//we can use instead if we wanted:
router.put('/users/:id/remove', authMiddleware.protect, userController.removeWorkerFromJob)
//instead of these
router.put('/users/:id/removeResp', authMiddleware.protect, authMiddleware.restrictTo('admin'), userController.removeWorkerFromJob); // Admin ydesmisionni responsable
router.put('/users/:id/removeDev', authMiddleware.protect, authMiddleware.restrictTo('admin','responsible-dev'), userController.removeWorkerFromJob); // démisionner dev
router.put('/users/:id/removeTest', authMiddleware.protect, authMiddleware.restrictTo('admin','responsible-testor'), userController.removeWorkerFromJob); // démisionner test

module.exports = router;