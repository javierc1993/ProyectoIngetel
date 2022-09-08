'use strict';
const { Instalation } = require('../models');

class InstalationRepository {


  async createInstalation (instalation) {
    try {
      const resp = await Instalation.create(instalation);
      return resp;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = new InstalationRepository();