const express = require('express');
const PayOrderController = require('../controllers/pay-order.controller');

const PayOrderRoute = express.Router();




PayOrderRoute.delete('/:reference', PayOrderController.deletePayOrder);


module.exports = PayOrderRoute;
