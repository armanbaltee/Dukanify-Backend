const express = require('express');
const controller = require('../../controller/login/verifyEmail.controller');
const routes = express.Router();


routes.post('/verifyOTP', controller.verifyOTP)

routes.post('/resendOTP', controller.resendOTP)

module.exports = routes