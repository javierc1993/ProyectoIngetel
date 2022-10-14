'use strict';
const XLSX = require('xlsx');

const PayOrderService = require('../services/payOrder.service');





class PayOrderController {
  async updatePayOrder (req, res) {
    try {
      const payOrder = req.body;
      const resp = PayOrderService.updatePayOrder(payOrder);
      return res.status(200).json({
        resultMsg: 'OK',
        result: resp
      })
    } catch (error) {
      return res.status(400);
    }
  }
};



module.exports = new PayOrderController();