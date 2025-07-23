const express = require('express');
const router = express.Router();
const { signup } = require('../../controller/signup/SignUpController');
const Controller =require('../../controller/signup/SignUpController');
const signupMiddleware = require('../../Middleware/signup/SignUpMiddleware');


router.post('/signup',signupMiddleware.signupMiddleware, Controller.signup);


module.exports = router;