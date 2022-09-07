'use strict';
const { Site } = require('../models');

class PayOrderRepository {
  async getSiteBySmp (smp) {
    const site = await Site.findOne({
      where: {
        smp: smp
      }
    });
    if (site.length) return site[0].dataValues;
    return null;
  }

  async createSite (site) {
    try {
      const site = this.getSiteBySmp(site.smp);
      if (site) return site;
      const resp = await Site.create(site);
      return resp;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = new PayOrderRepository();