'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Instalation = sequelize.define('Instalation', {
    date: DataTypes.DATE
  }, {
    tableName: 'instalations'
  });

  Instalation.associate = function (models) {
    //associations 

    Instalation.belongsTo(models.PayOrder, {as:'payOrder', foreignKey:'payOrderId'})

  };

  return Instalation;
};

