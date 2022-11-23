'use strict';
const { OnAir } = require('../models');
const { ForbiddenError } = require('../entities/error-entity');
class OnAirRepository {
  async deleteOnAirById (id) {
    try {
      const deleteId = await OnAir.destroy({
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

  async createOnAir (onAir) {
    try {
      const resp = await OnAir.create(onAir);
      return resp;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = new OnAirRepository();