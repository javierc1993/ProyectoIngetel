'use strict';
const { Production } = require('../models');

class ProductionRepository {


  async createProduction (production) {
    try {
      const resp = await Production.create(production);
      return resp;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = new ProductionRepository();