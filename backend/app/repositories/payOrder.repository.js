'use strict';
const { PayOrder } = require('../models');

class PayOrderRepository {
  async getPoByReference (reference) {
    const po = await PayOrder.findOne({
      where: {
        reference: reference
      }
    });
    if (po.length) return po[0].dataValues;
    return null;
  }

  async createPayOrder (po) {
    try {
      let resp = await this.getPoByReference(po.reference);
      if (!resp) resp = await PayOrder.create(po);
      return resp;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = new PayOrderRepository();