'use strict';
const { Integration } = require('../models');

class IntegrationRepository {


  async createIntegration (integration) {
    try {
      const resp = await Integration.create(integration);
      return resp;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = new IntegrationRepository();