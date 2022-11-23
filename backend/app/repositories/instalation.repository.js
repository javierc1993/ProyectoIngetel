'use strict';
const { Instalation } = require('../models');
const { ForbiddenError } = require('../entities/error-entity');
class InstalationRepository {
  async deleteInstalationById (id) {
    try {
      const deleteId = await Instalation.destroy({
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