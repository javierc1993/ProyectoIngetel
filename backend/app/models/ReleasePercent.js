'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const ReleasePercent = sequelize.define('ReleasePercent', {
    percent: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
  }, {
    tableName: 'releasePercents'
  });

  ReleasePercent.associate = function (models) {
    //associations 
    ReleasePercent.belongsTo(models.PayOrder, { as: 'payOrder' })
    ReleasePercent.hasOne(models.Invoice, {as:'invoice', foreignKey:'releasePercentId'})
  };

  return ReleasePercent;
};