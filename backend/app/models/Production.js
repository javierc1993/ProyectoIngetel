'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Production = sequelize.define('Production', {
    date: DataTypes.DATE
  }, {
    tableName: 'productions'
  });

  Production.associate = function (models) {
    //associations 

    Production.belongsTo(models.PayOrder, {as:'payOrder', foreignKey:'payOrderId'})

  };

  return Production;
};

