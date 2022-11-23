'use strict';
const { Integration } = require('../models');
const { ForbiddenError } = require('../entities/error-entity');
class IntegrationRepository {
  async deleteIntegrationById (id) {
    try {
      const deleteId = await Integration.destroy({
        // truncate: true,
        where: {
          id: id
        }
      })
      return true;

    } catch (error) {
      console.log(error);
      throw new ForbiddenError();
    }
  }

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