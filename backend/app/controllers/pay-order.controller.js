'use strict';

const PayOrderService = require('../services/payOrder.service');
const { MandatoryFieldError } = require('../entities/error-entity');
const { responseDeleted } = require('../lib/response');



class PayOrderController {

  async deletePayOrder (req, res) {
    try {
      const reference = req.params.reference ?? null;
      if (!reference) throw new MandatoryFieldError('reference');
      const resp = await PayOrderService.deletePayOrder(reference);
      return responseDeleted(res);
    } catch (error) {
      return res.status(error.statusCode ?? 400).json({
        resultMsg: error.resultMsg ?? null,
        resultCode: error.resultCode ?? null
      })
    }
  }
};

module.exports = new PayOrderController();