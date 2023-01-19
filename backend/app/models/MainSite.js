'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const MainSite = sequelize.define('MainSite', {
    smp: DataTypes.STRING,
    proyect: DataTypes.STRING,
    region: DataTypes.STRING

  }, {
    tableName: 'mainSites'
  });

  MainSite.associate = function (models) {
    //associations 
    MainSite.hasMany(models.Site, {as:'site', foreignKey:'mainSiteId'})
  };

  return MainSite;
};
