const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');
const authMiddleware = require('../tools/authMiddleware');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;


//le authmiddleware  estaamaltou fl routes hethom mtea login et signup
//ama najm nstaamlou d'autre facon et besh thellen   barsha mashekl o besh tbadl l vision lkolha
//voir les 3 captures