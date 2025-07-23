const express = require('express');
const router = express.Router();
const authController = require('../controller/passport.controller');

router.post('/google', authController.googleLogin);
router.get('/current_user', authController.getCurrentUser);
router.post('/logout', authController.logout);

module.exports = router;
