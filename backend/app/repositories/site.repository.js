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
      return Site.findOrCreate({
        where: {
          name: site.name,
          smp: site.smp,
          region: site.region
        }
      })
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