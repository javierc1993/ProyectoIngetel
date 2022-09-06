'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const MainSite = sequelize.define('MainSite', {
    name: DataTypes.STRING,
    smp: DataTypes.STRING
  }, {
    tableName: 'mainSites'
  });

  MainSite.associate = function (models) {
    //associations 
    MainSite.hasMany(models.Site, {as:'site', foreignKey:'mainSiteId'})
  };

  return MainSite;
};
