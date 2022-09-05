'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const MainSite = sequelize.define('MainSite', {
    name: DataTypes.STRING,
    smp: DataTypes.STRING
  }, {
    tableName: 'main_sites'
  });

  MainSite.associate = function (models) {
    //associations 



  };

  return MainSite;
};
