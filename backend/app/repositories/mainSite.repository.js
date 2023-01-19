'use strict';
const { MainSite } = require('../models');

class PayOrderRepository {
  async getMainSiteBySmp (numbersmp) {

    const site = await MainSite.findOne({
      where: {
        smp: numbersmp
      }
    });
    return site;
    // if (site.length) return site[0].dataValues;
    // return null;
  }

  async createMainSite (mainSite) {
    try {
      
      const site = await this.getMainSiteBySmp(mainSite.smp);
      if (site) return site;
      const resp = await MainSite.create(mainSite);
      return resp.dataValues;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = new PayOrderRepository();