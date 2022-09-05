const express = require('express');
const ProductionController = require('../controllers/production.controller');

const ProductionRoute = express.Router();


ProductionRoute.post('/upload', ProductionController.upload);
ProductionRoute.get('/', ProductionController.getProduction);



module.exports = ProductionRoute;
