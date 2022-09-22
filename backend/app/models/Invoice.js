'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    reference: DataTypes.STRING,
    date: DataTypes.STRING,
    subTotal: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
  }, {
    tableName: 'Invoices'
  });

  Invoice.associate = function (models) {
    //associations 

    Invoice.belongsTo(models.User, { as: 'client', foreignKey: 'idClient' });


    // Invoice.belongsTo(models.ReleasePercent,{as:'releasePercent', foreignKey:'releasePercentId'})

    

  };

  return Invoice;
};