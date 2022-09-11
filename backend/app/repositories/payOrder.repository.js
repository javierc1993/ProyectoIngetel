'use strict';
const { PayOrder, Instalation, Integration, MosHw, OnAir, Site, User } = require('../models');
const SiteRepository = require('./site.repository');
const UserRepository = require('./user.repository');


class PayOrderRepository {
  async getAll () {
    return PayOrder.findAll({
      include:[
        {
          model: Instalation,
          as: 'instalation',
          attributes:['date']
        },
        {
          model: Integration,
          as: 'integration',
          attributes:['date']
        },
        {
          model: MosHw,
          as: 'mosHw',
          attributes:['date']
        },
        {
          model: OnAir,
          as: 'onAir',
          attributes:['date']
        },
        {
          model: Site,
          as: 'site'
        },
        {
          model: User,
          as: 'leader'
        }
      ]
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
      return resp;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = new PayOrderRepository();