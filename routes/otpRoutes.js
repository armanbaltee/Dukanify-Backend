const express = require('express');
const router = express.Router();
const otpController = require('../controller/otpController');

router.post('/verifyotp', otpController.verifyOTP);
router.post('/resendotp', otpController.resendOTP);

module.exports = router;

