'use strict';
const { OnAir } = require('../models');

class OnAirRepository {


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