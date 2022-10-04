'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Pay = sequelize.define('Pay', {
    documentNumber: DataTypes.INTEGER,
    amountUtilized: DataTypes.DOUBLE,
    financialCost: DataTypes.DOUBLE,
    totalPaid: DataTypes.DOUBLE,
    maturityDate: DataTypes.DATE,
    publishDate: DataTypes.DATE,
    datePay: DataTypes.DATE,
    state: DataTypes.STRING,
    discountTime: DataTypes.STRING
  }, {
    tableName: 'pays'
  });

  Pay.associate = function (models) {
    //associations 
    Pay.belongsTo(models.Invoice, { as: 'invoice', foreignKey: 'payId' });
  };

  return Pay;
};
