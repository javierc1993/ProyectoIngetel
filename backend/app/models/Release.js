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
    totalPercent: DataTypes.INTEGER
  }, {
    tableName: 'releases'
  });

    Release.associate = function (models) {
    //associations 
    Release.belongsTo(models.PayOrder, { as: 'payOrder' });
    
  };

  return Release;
};

