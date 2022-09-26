'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const MosHw = sequelize.define('MosHw', {
    date: DataTypes.DATE
  }, {
    tableName: 'mosHws'
  });

  MosHw.associate = function (models) {
    //associations 

    MosHw.belongsTo(models.PayOrder, {as:'payOrder', foreignKey:'payOrderId'})

  };

  return MosHw;
};

