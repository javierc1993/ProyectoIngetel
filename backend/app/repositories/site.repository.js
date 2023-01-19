'use strict';
const { Site } = require('../models');

class SiteRepository {
  async getSiteBySmp(smp) {
    const site = await Site.findOne({
      where: {
        smp: smp
      }
    });
    return site;
  }

  async getSiteByPrk(prk) {
    const site = await Site.findByPk(prk);
    return site;
  }

  async createSite(site) {
    try {
      let resp = await this.getSiteBySmp(site.smp);
      if (resp) return resp;
      resp = await Site.create(site);
      return resp;

    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async newSite(site) {
    try {
      return Site.create(site);

    } catch (err) {
      console.log(err);
      return null;
    }
  }
}


module.exports = new SiteRepository();