'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define('Site', {
    name: DataTypes.STRING,
    smp: DataTypes.STRING,
    region: DataTypes.STRING
  }, {
    tableName: 'sites'
  });

  Site.associate = function (models) {
    //associations 
    Site.belongsTo(models.MainSite, { as: 'mainSite' })
    Site.hasMany(models.PayOrder, { as: 'payOrder', foreignKey: 'siteId' })

  };

  return Site;
};
