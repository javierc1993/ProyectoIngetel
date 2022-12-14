'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    client: DataTypes.STRING,
    date: DataTypes.DATE,
    invoice: DataTypes.STRING,
    subTotal: DataTypes.DOUBLE,
    iva: DataTypes.DOUBLE,
    total: DataTypes.DOUBLE,
    rtf: DataTypes.DOUBLE,
    rtIva: DataTypes.DOUBLE,
    toPaid: DataTypes.DOUBLE,
    totalPaid: DataTypes.DOUBLE,
    datePay: DataTypes.DATE,
    release: DataTypes.STRING,
    percentInvoice: DataTypes.INTEGER,
    observation: DataTypes.STRING,
    state: DataTypes.STRING,

  }, {
    tableName: 'invoices'
  });

  Invoice.associate = function (models) {
    //associations 

    Invoice.belongsTo(models.PayOrder, { as: 'payOrder' });
    Invoice.hasOne(models.Pay, {as:'pay', foreignKey:'invoiceId'});


  };

  return Invoice;
};