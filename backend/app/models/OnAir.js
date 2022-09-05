'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const OnAir = sequelize.define('OnAir', {
    date: DataTypes.STRING
  }, {
    tableName: 'onAirs'
  });

  OnAir.associate = function (models) {
    //associations 

    OnAir.belongsTo(models.PayOrder, {as:'payOrder', foreignKey:'payOrderId'})

  };

  return OnAir;
};

