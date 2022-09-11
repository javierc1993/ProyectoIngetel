'use strict';
const { MainSite } = require('../models');

class PayOrderRepository {
  async getMainSiteBySmp (smp) {
    const site = await MainSite.findOne({
      where: {
        smp: smp
      }
    });
    if (site.length) return site[0].dataValues;
    return null;
  }

  async createMainSite (mainSite) {
    try {
      const site = this.getMainSiteBySmp(mainSite.smp);
      if (site) return site;
      const resp = await MainSite.create(mainSite);
      return resp;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = new PayOrderRepository();