'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    document: DataTypes.STRING,
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,


  }, {
    tableName: 'users'
  });

  User.associate = function (models) {
    //associations 
    User.hasOne(models.Invoice, { as: 'invoice', foreignKey: 'idClient' })

    User.belongsTo(models.Account, {as: 'account', foreignKey:'accountId'});
    

  };

  return User;
};
