'use strict';
const { Release, PayOrder } = require('../models');



class PayOrderRepository {
  async getAllReleases () {
    return Release.findAll();
  };

  async getReleaseById (id) {
    const resp = await Release.findById(id);
    return resp;
  }
  async getReleaseBySgr (sgr) {
    const resp = await Release.findOne({
      where: {
        sgrNumber: sgr
      }
    });
    return resp;
  }

  async createRelease (release) {
    try {
      let resp;
      resp = await this.getReleaseBySgr(release.sgrNumber);
      console.log(resp);
      if (!resp) {
        resp = await Release.create(release);
      }
      return resp;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async setPayOrder (release, payOrderId) {
    return release.setPayOrder(payOrderId);
  }

  async setReleaseType (release, releaseTypeId) {
    return release.setReleaseType(releaseTypeId);
  }
}



module.exports = new PayOrderRepository();