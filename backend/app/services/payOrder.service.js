'use strict';
const PayOrderRepository = require('../repositories/payOrder.repository');

class PayOrderService {
  

  async createPayOrders (request) {
    const response = await Promise.all(request.map(async po => {
      const payOrder = {
        reference: po.PO,
        value: po[' VALOR PO ']
      }
      return PayOrderRepository.createPayOrder(payOrder);

    })
    );
    return response;
  }
}


module.exports = new PayOrderService();