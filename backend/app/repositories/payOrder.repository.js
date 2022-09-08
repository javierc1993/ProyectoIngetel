'use strict';
const { PayOrder, Site } = require('../models');
const SiteRepository = require('./site.repository');


class PayOrderRepository {
  async getPoByReference (reference) {
    const po = await PayOrder.findOne({
      where: {
        reference: reference
      }
    });
    return po;
  }

  async createPayOrder (po) {
    try {
      let site;
      let resp = await this.getPoByReference(po.reference);
      if (!resp) resp = await PayOrder.create(po);
      if (po.Sites.smp) {
        site = await SiteRepository.createSite(po.Sites)
      }
      
      resp.setSite(site.id);
      return resp;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = new PayOrderRepository();