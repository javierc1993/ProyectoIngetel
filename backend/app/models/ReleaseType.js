'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const ReleaseType = sequelize.define('ReleaseType', {
    name: DataTypes.STRING
  }, {
    tableName: 'releaseTypes'
  });

  ReleaseType.associate = function (models) {
    //associations 

    ReleaseType.hasOne(models.Release, { as: 'release', foreignKey: 'releaseTypeId' })
    ReleaseType.hasMany(models.Percent, { as: 'percent', foreignKey: 'releaseTypeId' })

  };

  return ReleaseType;
};

