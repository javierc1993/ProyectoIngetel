const express = require('express');
const AppMiddleware = require('../middlewares/app.middleware');
const AppController = require('../controllers/app.controller');

const AppRoute = express.Router();


AppRoute.get('/', AppMiddleware, AppController.test);


module.exports = AppRoute;
