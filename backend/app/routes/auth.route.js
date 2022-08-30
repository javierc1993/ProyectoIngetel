const express = require('express');
const AuthController = require('../controllers/auth.controller');

const AuthRoute = express.Router();


AuthRoute.post('/login', AuthController.login);
AuthRoute.post('/register', AuthController.register);
AuthRoute.post('/validateToken', AuthController.validateToken);


module.exports = AuthRoute;
