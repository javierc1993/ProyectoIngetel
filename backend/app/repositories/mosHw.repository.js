'use strict';
const { MosHw } = require('../models');

class MosHwRepository {


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