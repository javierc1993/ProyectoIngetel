'use strict';
const { ReleaseType, Percent, PercentField } = require('../models');



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
      },
      include:[
        {
          model: Percent,
          as: 'percent',
          include:[
            {
              model: PercentField,
              as: 'percentField'
            }
          ]
        }
      ]
    });
    return resp;
  }

}



module.exports = new ReleaseTypeRepository();