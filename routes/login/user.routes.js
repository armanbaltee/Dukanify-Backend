const express = require('express');
const middleware = require('../../Middleware/login/user.middleware');
const controller = require('../../controller/login/user.controller');
const routes = express.Router();

routes.post('/login', middleware.login, controller.login);



module.exports = routes;