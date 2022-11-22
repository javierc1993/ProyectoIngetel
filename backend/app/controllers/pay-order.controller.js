'use strict';

const PayOrderService = require('../services/payOrder.service');




class PayOrderController {


  async deletePayOrder (req, res) {
    try {
      const reference = req.params.reference ?? null;
      if (!reference) throw new Error('Ned parameter');
      const resp = await PayOrderService.deletePayOrder(reference);
      return res.status(200).json({
        resultMsg: 'OK',
        result: resp
      })

    } catch (error) {
      return res.status(404).json({
        resultMsg: 'NOT FOUND REFERENSE PO'
      })

    }
  }



};



module.exports = new PayOrderController();