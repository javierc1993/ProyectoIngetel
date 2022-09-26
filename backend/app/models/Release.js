'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Release = sequelize.define('Release', {
    proyect: DataTypes.STRING,
    woName: DataTypes.STRING,
    vendorSapName: DataTypes.STRING,
    iaDate: DataTypes.DATE,
    grDate: DataTypes.DATE,
    sgrNumber: DataTypes.STRING,
    date: DataTypes.DATE,
    ppa: DataTypes.DATE,
    percent: DataTypes.INTEGER
  }, {
    tableName: 'releases'
  });

  Release.associate = function (models) {
    //associations 
    Release.belongsTo(models.PayOrder, { as: 'payOrder' });
    Release.belongsTo(models.ReleaseType, { as: 'releaseType', foreignKey: 'releaseTypeId' });
  };

  return Release;
};

