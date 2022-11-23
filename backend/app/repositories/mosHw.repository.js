'use strict';
const { MosHw } = require('../models');
const { ForbiddenError } = require('../entities/error-entity');
class MosHwRepository {
  async deleteMosHwById (id) {
    try {
      const deleteId = await MosHw.destroy({
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

  async createMosHw (mosHw) {
    try {
      const resp = await MosHw.create(mosHw);
      return resp;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = new MosHwRepository();