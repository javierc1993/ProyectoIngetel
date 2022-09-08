'use strict';
const { Site } = require('../models');

class SiteRepository {
  async getSiteBySmp (smp) {
    const site = await Site.findOne({
      where: {
        smp: smp
      }
    });
    return site;
  }

  async createSite (site) {
    try {
      let siteDb = await this.getSiteBySmp(site.smp);
      if (siteDb) return site;
      siteDb = await this.newSite(site);
      console.log('site', siteDb)
      return siteDb;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async newSite (site) {
    try {
      return Site.create(site);
      
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}


module.exports = new SiteRepository();