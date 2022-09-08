'use strict';
const { PayOrder, Instalation, Integration, MosHw, OnAir } = require('../models');
const SiteRepository = require('./site.repository');


class PayOrderRepository {
  async getAll () {
    return PayOrder.findAll();
  };

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
      Instalation.create({ date: po.Instalations.date, payOrderId: resp.id })
      Integration.create({ date: po.Integrations.date, payOrderId: resp.id })
      MosHw.create({ date: po.MosHws.date, payOrderId: resp.id })
      OnAir.create({ date: po.OnAirs.date, payOrderId: resp.id })
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