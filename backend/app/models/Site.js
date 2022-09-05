'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define('Site', {
    name: DataTypes.STRING,
    smp: DataTypes.STRING,
    scenary: DataTypes.STRING,
    region: DataTypes.STRING,
    band: DataTypes.STRING


  }, {
    tableName: 'sites'
  });

  Site.associate = function (models) {
    //associations 

    

  };

  return Site;
};
