'use strict';
const { PayOrder, Instalation, Integration, MosHw, OnAir, Site, User, Release } = require('../models');
const SiteRepository = require('./site.repository');
const UserRepository = require('./user.repository');
const { Op, Sequelize } = require('sequelize');

class PayOrderRepository {
  async getAll (include, where = null) {

    if (where) {
      return PayOrder.findAll({
        where: where,
        include: include
      });

    }
    return PayOrder.findAll({
      include: include
    });
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
      let leader;
      if (po.Sites.smp) {
        site = await SiteRepository.createSite(po.Sites)
        po.siteId = site[0].dataValues.id
      }
      if (po.Leaders.name) {
        leader = await UserRepository.newLeader(po.Leaders.name)
        po.leaderId = leader[0].dataValues.id
      }
      let resp = await this.getPoByReference(po.reference);
      if (!resp) {
        resp = await PayOrder.create(po);
        Instalation.create({ date: po.Instalations.date, payOrderId: resp.id });
        Integration.create({ date: po.Integrations.date, payOrderId: resp.id });
        MosHw.create({ date: po.MosHws.date, payOrderId: resp.id });
        OnAir.create({ date: po.OnAirs.date, payOrderId: resp.id });
      }

      resp.set(po);
      Instalation.update({ date: po.Instalations.date }, { where: { payOrderId: resp.id } });
      Integration.update({ date: po.Integrations.date }, { where: { payOrderId: resp.id } });
      MosHw.update({ date: po.MosHws.date }, { where: { payOrderId: resp.id } });
      OnAir.update({ date: po.OnAirs.date }, { where: { payOrderId: resp.id } });
      return resp.save();
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async updateValuePayOrder (reference, value) {
    let po = await this.getPoByReference(reference);
    if (po) {
      po.value = value;
      po.save();
      return true
    }
    return false;
  }
}

module.exports = new PayOrderRepository();