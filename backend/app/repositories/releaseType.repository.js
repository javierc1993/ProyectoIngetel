'use strict';
const { ReleaseType } = require('../models');



class ReleaseTypeRepository {
  async getAllReleasesTypes () {
    return ReleaseType.findAll();
  };

  async getReleaseTypeById (id) {
    const resp = await ReleaseType.findById(id);
    return resp;
  }
  async getReleaseTypeByName (name) {
    const resp = await ReleaseType.findOne({
      where: {
        name: name
      }
    });
    return resp;
  }

}



module.exports = new ReleaseTypeRepository();