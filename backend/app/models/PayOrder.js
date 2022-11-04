'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const PayOrder = sequelize.define('PayOrder', {
    reference: DataTypes.STRING,
    scenery: DataTypes.STRING,
    band: DataTypes.STRING,
    value: DataTypes.DOUBLE
  }, {
    tableName: 'payOrders'
  });

  PayOrder.associate = function (models) {
    //associations 
    PayOrder.hasMany(models.Release, { as: 'release', foreignKey: 'payOrderId' })
    PayOrder.hasMany(models.Invoice, { as: 'invoice', foreignKey: 'payOrderId' })
    PayOrder.belongsTo(models.Site, { as: 'site' });

    PayOrder.hasOne(models.Instalation, {as:'instalation', foreignKey:'payOrderId'});
    PayOrder.hasOne(models.Integration, {as:'integration', foreignKey:'payOrderId'});
    PayOrder.hasOne(models.MosHw, {as:'mosHw', foreignKey:'payOrderId'});
    PayOrder.hasOne(models.OnAir, {as:'onAir', foreignKey:'payOrderId'});
    PayOrder.hasOne(models.Production, {as:'production', foreignKey:'payOrderId'});
    PayOrder.belongsTo(models.User, {as:'leader', foreignKey:'leaderId'});

  };

  return PayOrder;
};

