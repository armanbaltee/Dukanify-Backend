const express = require('express');
const middleware = require('../middleware/user.middleware');
const controller = require('../controller/user.controller');
const routes = express.Router();

routes.post('/login', middleware.login, controller.login);



module.exports = routes;