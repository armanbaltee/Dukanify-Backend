const express = require('express');
const router = express.Router();
const authController = require('../../controller/signup/passport.controller');

router.post('/google', authController.googleLogin);


module.exports = router;
