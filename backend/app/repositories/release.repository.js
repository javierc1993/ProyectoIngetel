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
      if (!resp) {
        return Release.create(release);
      }
      resp.set(release);
      return resp.save();
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async setPayOrder (release, payOrderId) {
    return release.setPayOrder(payOrderId);
  }


}



module.exports = new PayOrderRepository();